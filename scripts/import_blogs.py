"""Import every article in ReNew's public blog archive as local Markdown.

Run with `uv run --with beautifulsoup4 --with markdownify python3 scripts/import_blogs.py`.
"""

from __future__ import annotations

import json
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from pathlib import Path
from urllib.parse import quote, urljoin, urlparse, urlsplit, urlunsplit
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup
from markdownify import markdownify


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content" / "blogs"
IMAGES = ROOT / "public" / "images" / "blogs"
ARCHIVE = "https://www.renew.com/blog"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ReNewBlogImporter/1.0)"}


def fetch(url: str) -> bytes:
    parts = urlsplit(url)
    url = urlunsplit((parts.scheme, parts.netloc, quote(parts.path, safe="/%+"), parts.query, parts.fragment))
    for attempt in range(4):
        try:
            with urlopen(Request(url, headers=HEADERS), timeout=45) as response:
                return response.read()
        except Exception as error:
            if attempt == 3:
                raise RuntimeError(f"Could not fetch {url}: {error}") from error
            time.sleep(1 + attempt * 2)
    raise RuntimeError(f"Could not fetch {url}")


def archive_entries() -> list[dict[str, str]]:
    soup = BeautifulSoup(fetch(ARCHIVE), "html.parser")
    entries: dict[str, dict[str, str]] = {}
    for item in soup.select(".Newsmaster"):
        link = item.select_one('a[href*="/blog-detail/"]')
        if not link:
            continue
        title = item.select_one(".media-item__title")
        date = item.select_one("time")
        image = item.select_one(".media-item__image img[src]") or item.select_one("img[src]")
        entries[link["href"]] = {
            "sourceUrl": link["href"],
            "title": title.get_text(" ", strip=True) if title else "",
            "dateText": date.get_text(" ", strip=True) if date else "",
            "imageUrl": image["src"] if image else "",
            "category": "ESG" if item.get("data-cat", "").lower() == "esg" else (item.get("data-cat") or "General").title(),
        }
    return list(entries.values())


def save_image(url: str, slug: str, name: str) -> str:
    if urlparse(url).scheme not in {"http", "https"}:
        return ""
    extension = Path(urlparse(url).path).suffix.lower()
    if extension not in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
        extension = ".jpg"
    output = IMAGES / slug / f"{name}{extension}"
    output.parent.mkdir(parents=True, exist_ok=True)
    if not output.exists():
        output.write_bytes(fetch(url))
    return f"/images/blogs/{slug}/{output.name}"


def field(name: str, value: str) -> str:
    return f"{name}: {json.dumps(value, ensure_ascii=False)}"


def import_entry(entry: dict[str, str]) -> tuple[str, int]:
    source_url = entry["sourceUrl"]
    slug = urlparse(source_url).path.rstrip("/").split("/")[-1]
    soup = BeautifulSoup(fetch(source_url), "html.parser")
    heading = soup.select_one(".inner-heading-title1")
    title = heading.get_text(" ", strip=True) if heading else entry["title"]
    metadata = [node.get_text(" ", strip=True) for node in soup.select(".news-card-publish")]
    date_text = next((item.split(":", 1)[-1].strip() for item in metadata if item.lower().startswith("published on")), entry["dateText"])
    date = datetime.strptime(" ".join(date_text.split()), "%d %B %Y").date().isoformat()
    author = next((item.split(":", 1)[-1].strip() for item in metadata if item.lower().startswith("written by")), "ReNew")
    publisher = next((item.split(":", 1)[-1].strip() for item in metadata if item.lower().startswith("published by")), "ReNew")
    category = entry["category"]
    cover_url = entry["imageUrl"]
    if not cover_url:
        og_image = soup.select_one('meta[property="og:image"][content]')
        cover_url = og_image["content"] if og_image else ""
    image = save_image(urljoin(source_url, cover_url), slug, "cover") if cover_url else ""

    body_node = soup.select_one(".news-details-info.blog-info")
    if not body_node:
        raise ValueError(f"No article body: {source_url}")
    for unwanted in body_node.select("script, style"):
        unwanted.decompose()
    for embed in body_node.select("iframe[src]"):
        link = soup.new_tag("a", href=urljoin(source_url, embed["src"]))
        link.string = "Watch embedded media"
        embed.replace_with(link)
    for index, embedded in enumerate(body_node.select("img[src]"), start=1):
        image_url = urljoin(source_url, embedded["src"])
        local_image = save_image(image_url, slug, f"image-{index}")
        if local_image:
            embedded["src"] = local_image
            embedded.attrs.pop("srcset", None)
        else:
            embedded.decompose()
    for linked in body_node.select("a[href]"):
        href = linked["href"].strip()
        if href.lower().startswith("mailto") and not href.lower().startswith("mailto:"):
            linked["href"] = "mailto:" + href[6:]
        elif "\\" in href:
            linked.unwrap()
        else:
            absolute = urljoin(source_url, href)
            parsed = urlparse(absolute)
            if parsed.hostname in {"www.renew.com", "renew.com"} and parsed.path.startswith("/blog-detail/"):
                linked["href"] = "/blogs/" + parsed.path.rstrip("/").split("/")[-1]
            else:
                linked["href"] = absolute
    for related_table in body_node.select("table"):
        related_link = related_table.select_one('a[href^="/blogs/"]')
        if related_link:
            replacement = soup.new_tag("p")
            link = soup.new_tag("a", href=related_link["href"])
            link.string = related_link.get_text(" ", strip=True)
            replacement.append(link)
            related_table.replace_with(replacement)
    for empty in body_node.select("p"):
        if not empty.get_text(" ", strip=True) and not empty.select_one("img"):
            empty.decompose()
    body = markdownify(str(body_node), heading_style="ATX", bullets="-")
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    body = re.sub(r"(?m)^#{1,6}\s*$\n?", "", body)
    if len(body) < 500:
        raise ValueError(f"Suspiciously short article body: {source_url}")
    og_description = soup.select_one('meta[property="og:description"][content]')
    first_paragraph = next((node.get_text(" ", strip=True) for node in body_node.select("p") if len(node.get_text(" ", strip=True)) > 80), title)
    description = og_description["content"] if og_description else first_paragraph
    if description and description[-1] not in ".!?…":
        description = first_paragraph
    description = re.sub(r"\s+", " ", description).strip()
    if len(description) > 200:
        description = description[:200].rsplit(" ", 1)[0].rstrip(" ,;:") + "…"

    fields = [
        field("title", title),
        field("date", date),
        field("description", description),
        field("category", category),
        field("author", author),
        field("publisher", publisher),
        field("image", image),
        field("imageAlt", title),
        field("sourceUrl", source_url),
    ]
    CONTENT.mkdir(parents=True, exist_ok=True)
    (CONTENT / f"{slug}.md").write_text("---\n" + "\n".join(fields) + "\n---\n\n" + body + "\n", encoding="utf-8")
    return slug, len(body)


def main() -> None:
    entries = archive_entries()
    print(f"Found {len(entries)} unique blog posts", flush=True)
    failures = []
    with ThreadPoolExecutor(max_workers=6) as executor:
        tasks = {executor.submit(import_entry, entry): entry for entry in entries}
        for index, task in enumerate(as_completed(tasks), start=1):
            try:
                slug, length = task.result()
                print(f"[{index}/{len(entries)}] {slug}: {length} characters", flush=True)
            except Exception as error:
                failures.append((tasks[task]["sourceUrl"], str(error)))
                print(f"[{index}/{len(entries)}] FAILED {failures[-1]}", flush=True)
    if failures:
        raise RuntimeError(f"Failed imports: {failures}")


if __name__ == "__main__":
    main()

"""Import the public ReNew press archive into local Markdown and images.

Install dependencies with `python3 -m pip install -r scripts/press_import_requirements.txt`
then run `python3 scripts/import_press_releases.py`. Existing articles are refreshed.
"""

from __future__ import annotations

import json
import hashlib
import re
import time
import unicodedata
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime
from io import BytesIO
from pathlib import Path
from urllib.parse import quote, urlencode, urljoin, urlparse, urlsplit, urlunsplit
from urllib.request import Request, urlopen

from bs4 import BeautifulSoup
from markdownify import markdownify
from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
CONTENT = ROOT / "content" / "press-releases"
IMAGES = ROOT / "public" / "images" / "press-releases"
PDFS = ROOT / "public" / "press-releases"
ARCHIVE = "https://www.renew.com/load-press"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; ReNewPressArchiveImporter/1.0)"}
GENERIC_COVER_SHA1 = "bdeafc9ce4bbf78a255454469140b03a976c7a33"
FALLBACK_PDFS = {
    "renew-power-achieves-milestone-of-1gw-capacity": (
        "https://www.renew.com/cms/public/storage/pages/wp-content/uploads/2021/06/"
        "Press-Release._ReNew-Power-Achieves-Milestone-of-1GW-Capacity-.pdf"
    ),
}
FALLBACK_HTML = {
    "renew-announces-date-and-conference-call-details-for-q3-fy-22-earnings-report-2022-02-18": (
        "https://www.prnewswire.com/news-releases/"
        "renew-announces-date-and-conference-call-details-for-q3-fy-22-earnings-report-301485940.html"
    ),
}


def fetch(url: str) -> bytes:
    parts = urlsplit(url)
    url = urlunsplit((parts.scheme, parts.netloc, quote(parts.path, safe="/%"), parts.query, parts.fragment))
    for attempt in range(4):
        try:
            with urlopen(Request(url, headers=HEADERS), timeout=45) as response:
                return response.read()
        except Exception:
            if attempt == 3:
                raise
            time.sleep(1 + attempt * 2)
    raise RuntimeError(f"Could not fetch {url}")


def archive_entries() -> list[dict[str, str]]:
    cursor = "0"
    entries: dict[str, dict[str, str]] = {}
    seen_cursors: set[str] = set()
    while cursor not in seen_cursors:
        seen_cursors.add(cursor)
        url = f"{ARCHIVE}?{urlencode({'id': cursor, 'year': '', 'search': ''})}"
        soup = BeautifulSoup(fetch(url), "html.parser")
        for item in soup.select(".mainPress"):
            link = item.select_one("a.media-item[href]")
            if not link:
                continue
            source_url = link["href"]
            title = item.select_one(".media-item__title")
            date = item.select_one(".media-item__date")
            image = item.select_one(".media-item__image img[src]")
            entries[source_url] = {
                "sourceUrl": source_url,
                "title": title.get_text(" ", strip=True) if title else "",
                "dateText": date.get_text(" ", strip=True) if date else "",
                "imageUrl": image["src"] if image else "",
            }
        button = soup.select_one("#load_more_button[data-id]")
        if not button:
            break
        cursor = button["data-id"]
    return list(entries.values())


def save_image(url: str, slug: str, name: str) -> str:
    if urlparse(url).scheme not in {"http", "https"}:
        return ""
    original_name = Path(urlparse(url).path).name
    extension = Path(original_name).suffix.lower()
    if extension not in {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}:
        extension = ".jpg"
    output = IMAGES / slug / f"{name}{extension}"
    output.parent.mkdir(parents=True, exist_ok=True)
    if not output.exists():
        output.write_bytes(fetch(url))
    return f"/images/press-releases/{slug}/{output.name}"


def yaml_field(name: str, value: str) -> str:
    return f"{name}: {json.dumps(value, ensure_ascii=False)}"


def slug_for(entry: dict[str, str]) -> str:
    url = entry["sourceUrl"]
    if "/press-release/" in url:
        return urlparse(url).path.rstrip("/").split("/")[-1]
    text = unicodedata.normalize("NFKD", entry["title"]).encode("ascii", "ignore").decode()
    slug = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")[:100].rstrip("-")
    return f"{slug}-{datetime.strptime(' '.join(entry['dateText'].split()), '%d %B %Y').date()}"


def pdf_content(url: str, slug: str) -> tuple[str, str]:
    data = fetch(url)
    if not data.startswith(b"%PDF"):
        raise ValueError(f"Source is not a PDF: {url}")
    PDFS.mkdir(parents=True, exist_ok=True)
    (PDFS / f"{slug}.pdf").write_bytes(data)
    pages = PdfReader(BytesIO(data)).pages
    body = "\n\n".join((page.extract_text() or "").strip() for page in pages)
    body = re.sub(r"\n{3,}", "\n\n", body).strip()
    return body, f"/press-releases/{slug}.pdf"


def import_entry(entry: dict[str, str]) -> tuple[str, str]:
    source_url = entry["sourceUrl"]
    slug = slug_for(entry)
    is_html = "/press-release/" in source_url
    source_unavailable = False
    if is_html:
        try:
            soup = BeautifulSoup(fetch(source_url), "html.parser")
        except Exception:
            soup = BeautifulSoup("", "html.parser")
            source_unavailable = True
    else:
        soup = BeautifulSoup("", "html.parser")
    heading = soup.select_one("h1.inner-heading-title1")
    published = soup.select_one(".news-card-publish p")
    content = soup.select_one(".news-details-info")
    title = heading.get_text(" ", strip=True) if heading else entry["title"]
    date_text = published.get_text(" ", strip=True) if published else entry["dateText"]
    date = datetime.strptime(" ".join(date_text.split()), "%d %B %Y").date().isoformat()

    cover_url = entry["imageUrl"]
    if not cover_url:
        og_image = soup.select_one('meta[property="og:image"][content]')
        cover_url = og_image["content"] if og_image else ""
    image = save_image(cover_url, slug, "cover") if cover_url else ""
    image_placeholder = "not-available.png" in cover_url.lower() or (
        bool(image)
        and hashlib.sha1((ROOT / "public" / image.lstrip("/")).read_bytes()).hexdigest()
        == GENERIC_COVER_SHA1
    )

    if content:
        for unwanted in content.select("script, style, iframe"):
            unwanted.decompose()
        for index, embedded in enumerate(content.select("img[src]"), start=1):
            image_url = urljoin(source_url, embedded["src"])
            if image_url.startswith("file:") or "/C:/" in image_url:
                embedded.decompose()
                continue
            embedded["src"] = save_image(image_url, slug, f"image-{index}")
            embedded.attrs.pop("srcset", None)
        for linked in content.select("a[href]"):
            linked["href"] = urljoin(source_url, linked["href"])
        body = markdownify(str(content), heading_style="ATX", bullets="-")
        body = re.sub(r"\n{3,}", "\n\n", body).strip()
        paragraphs = [p.get_text(" ", strip=True) for p in content.select("p")]
        description = next((p for p in paragraphs if len(p) > 70), title)
    else:
        body = ""
        description = title

    download = soup.select_one("a.download[href]")
    pdf = urljoin(source_url, download["href"]) if download else (source_url if not is_html else FALLBACK_PDFS.get(slug, ""))
    local_pdf = ""
    alternate_url = ""
    if not is_html or (not body and pdf):
        try:
            body, local_pdf = pdf_content(pdf, slug)
            first_paragraph = next((p.strip() for p in body.split("\n\n") if len(p.strip()) > 70), "")
            description = first_paragraph if first_paragraph else title
        except Exception:
            source_unavailable = True
            fallback_url = FALLBACK_HTML.get(slug)
            if fallback_url:
                try:
                    fallback = BeautifulSoup(fetch(fallback_url), "html.parser")
                    fallback_body = fallback.select_one(".release-body > .row")
                    if fallback_body:
                        for image_node in fallback_body.select("img"):
                            image_node.decompose()
                        for hidden_link in fallback_body.select('a[href^="#"], a[href^="/cdn-cgi/"]'):
                            hidden_link.unwrap()
                        body = markdownify(str(fallback_body), heading_style="ATX").strip()
                        description = fallback_body.get_text(" ", strip=True)
                        alternate_url = fallback_url
                except Exception:
                    pass
    if not body:
        body = f"The original release is available at [ReNew]({source_url})."
    description = re.sub(r"\s+", " ", description).strip()
    if len(description) > 200:
        description = description[:200].rsplit(" ", 1)[0].rstrip(" ,;:") + "…"
    fields = [
        yaml_field("title", title),
        yaml_field("date", date),
        yaml_field("description", description),
        yaml_field("image", image),
        yaml_field("imageAlt", title),
        yaml_field("sourceUrl", source_url),
    ]
    if image_placeholder:
        fields.append("imagePlaceholder: true")
    if pdf:
        fields.append(yaml_field("sourcePdf", pdf))
    if local_pdf:
        fields.append(yaml_field("localPdf", local_pdf))
        body += f"\n\n[Download the original PDF]({local_pdf})"
    if alternate_url:
        fields.append(yaml_field("alternateUrl", alternate_url))
    if source_unavailable:
        fields.append("sourceUnavailable: true")
    markdown = "---\n" + "\n".join(fields) + "\n---\n\n" + body + "\n"
    CONTENT.mkdir(parents=True, exist_ok=True)
    output = CONTENT / f"{slug}.md"
    if source_unavailable and output.exists():
        existing = output.read_text(encoding="utf-8")
        if len(existing.split("---", 2)[-1]) > len(body) or "sourceUnavailable: true" not in existing:
            return slug, "preserved existing content (source unavailable)"
    output.write_text(markdown, encoding="utf-8")
    return slug, f"{len(body)} characters"


def main() -> None:
    entries = archive_entries()
    print(f"Found {len(entries)} unique press releases", flush=True)
    failures = []
    with ThreadPoolExecutor(max_workers=6) as executor:
        tasks = {executor.submit(import_entry, entry): entry for entry in entries}
        for index, task in enumerate(as_completed(tasks), start=1):
            try:
                slug, detail = task.result()
                print(f"[{index}/{len(entries)}] {slug}: {detail}", flush=True)
            except Exception as error:
                failures.append((tasks[task]["sourceUrl"], str(error)))
                print(f"[{index}/{len(entries)}] FAILED {failures[-1]}", flush=True)
    print(f"Imported {len(entries) - len(failures)} of {len(entries)}", flush=True)
    if failures:
        raise RuntimeError(f"Failed imports: {failures}")
    for entry in entries:
        output = CONTENT / f"{slug_for(entry)}.md"
        if "sourceUnavailable: true" in output.read_text(encoding="utf-8"):
            import_entry(entry)
    unresolved = sum(
        "sourceUnavailable: true" in path.read_text(encoding="utf-8")
        for path in CONTENT.glob("*.md")
    )
    print(f"{unresolved} sources remain unavailable", flush=True)


if __name__ == "__main__":
    main()

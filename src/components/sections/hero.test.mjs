import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "./hero.tsx";

test("renders the campaign video and copy as the second of four hero slides", () => {
  const markup = renderToStaticMarkup(createElement(Hero));

  expect(markup.match(/role="tab"/g)).toHaveLength(4);

  const firstSlideCopy = markup.indexOf("Switch to clean energy with ReNew Solar Panels");
  const campaignVideo = markup.indexOf("/videos/Renew_Solar_Hindi_20s.webm");
  const companySlideCopy = markup.indexOf("The company behind the world&#x27;s");

  expect(firstSlideCopy).toBeGreaterThan(-1);
  expect(campaignVideo).toBeGreaterThan(firstSlideCopy);
  expect(companySlideCopy).toBeGreaterThan(campaignVideo);
  expect(markup).toContain("Clean Energy");
  expect(markup).toContain("Humse Hai");
  expect(markup).toContain("15 years of powering");
  expect(markup).toContain("India&#x27;s clean energy transformation");
  expect(markup).toContain("Explore the Journey");
  expect(markup).toContain("/images/renew-solar-hindi-poster.png");
  expect(markup).not.toContain("/images/banner2.svg");

  const firstVideo = markup.match(/<video[^>]*ReNew Banner1\.webm[^>]*>/)?.[0];
  expect(firstVideo).toBeDefined();
  expect(firstVideo).not.toContain("loop");
});

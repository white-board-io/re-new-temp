import { expect, test } from "bun:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Hero } from "./hero.tsx";

test("renders the anniversary artwork and message as the second of four hero slides", () => {
  const markup = renderToStaticMarkup(createElement(Hero));

  expect(markup.match(/role="tab"/g)).toHaveLength(4);

  const firstSlideCopy = markup.indexOf("Switch to clean energy with ReNew Solar Panels");
  const anniversarySlideCopy = markup.indexOf("Clean Energy Humse Hai");
  const companySlideCopy = markup.indexOf("The company behind the world&#x27;s");

  expect(firstSlideCopy).toBeGreaterThan(-1);
  expect(anniversarySlideCopy).toBeGreaterThan(firstSlideCopy);
  expect(companySlideCopy).toBeGreaterThan(anniversarySlideCopy);
  expect(markup).toContain("ReNew Badal Raha Hai");
  expect(markup).toContain("15 years of powering");
  expect(markup).toContain("India’s clean energy transformation");
  expect(markup).toContain("Explore the Journey");
  expect(markup).toContain("/images/banner2.svg");
  expect(markup.match(/animate-sunburst/g)).toHaveLength(3);
});

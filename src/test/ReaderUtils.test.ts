import { isUrl, resolveLinks, markdownToHtml } from "../components/reader/utils.ts";
import { afterEach, test, expect } from "vitest";

test("Url validation from reader/utils", () => {
    expect(isUrl("https://github.com/elias-gill")).toBe(true);
    expect(isUrl("www.github.com/elias-gill")).toBe(true);
    expect(isUrl(("../reader.md"))).toBe(false);
    expect(isUrl("../../../folder/reader.md")).toBe(false);
    expect(isUrl("portfolio.md")).toBe(false);
    expect(isUrl("poli_term.md")).toBe(false);
});

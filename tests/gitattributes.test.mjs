import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const GA_PATH = resolve(ROOT, ".gitattributes");

describe(".gitattributes", () => {
  let content;

  it("exists at repository root", () => {
    assert.ok(existsSync(GA_PATH), ".gitattributes must exist at repo root");
  });

  it("is readable and non-empty", () => {
    content = readFileSync(GA_PATH, "utf8");
    assert.ok(content.length > 0, ".gitattributes must not be empty");
  });

  describe("default line ending rule", () => {
    it("specifies * text=auto eol=lf", () => {
      content ??= readFileSync(GA_PATH, "utf8");
      assert.match(
        content,
        /^\*\s+text=auto\s+eol=lf$/m,
        "must have '* text=auto eol=lf' as the default"
      );
    });
  });

  describe("AGC source files", () => {
    it("specifies *.agc text eol=lf", () => {
      content ??= readFileSync(GA_PATH, "utf8");
      assert.match(
        content,
        /^\*\.agc\s+text\s+eol=lf$/m,
        "must have '*.agc text eol=lf'"
      );
    });
  });

  describe("Markdown files", () => {
    it("specifies *.md text eol=lf", () => {
      content ??= readFileSync(GA_PATH, "utf8");
      assert.match(
        content,
        /^\*\.md\s+text\s+eol=lf$/m,
        "must have '*.md text eol=lf'"
      );
    });
  });

  describe("binary files", () => {
    it("marks bun.lockb as binary", () => {
      content ??= readFileSync(GA_PATH, "utf8");
      assert.match(
        content,
        /^bun\.lockb\s+binary$/m,
        "must mark bun.lockb as binary"
      );
    });
  });
});

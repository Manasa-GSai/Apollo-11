import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import editorconfig from "editorconfig";

const ROOT = resolve(import.meta.dirname, "..");
const EC_PATH = resolve(ROOT, ".editorconfig");

describe(".editorconfig", () => {
  it("exists at repository root", () => {
    assert.ok(existsSync(EC_PATH), ".editorconfig must exist at repo root");
  });

  it("declares root = true", () => {
    const raw = readFileSync(EC_PATH, "utf8");
    assert.match(raw, /^root\s*=\s*true/m, "must declare root = true");
  });

  describe("default [*] section", () => {
    let props;

    it("resolves properties for a generic file", async () => {
      props = await editorconfig.parse(resolve(ROOT, "somefile.txt"));
      assert.ok(props, "editorconfig must return props for a generic file");
    });

    it("sets indent_style = tab", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "somefile.txt"));
      assert.equal(props.indent_style, "tab");
    });

    it("sets tab_width = 8", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "somefile.txt"));
      assert.equal(props.tab_width, 8);
    });

    it("sets trim_trailing_whitespace = true", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "somefile.txt"));
      assert.equal(props.trim_trailing_whitespace, true);
    });

    it("sets insert_final_newline = true", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "somefile.txt"));
      assert.equal(props.insert_final_newline, true);
    });
  });

  describe("[*.agc] section", () => {
    let props;

    it("resolves properties for .agc files", async () => {
      props = await editorconfig.parse(resolve(ROOT, "example.agc"));
      assert.ok(props, "editorconfig must return props for .agc files");
    });

    it("sets indent_style = tab", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "example.agc"));
      assert.equal(props.indent_style, "tab");
    });

    it("sets tab_width = 8", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "example.agc"));
      assert.equal(props.tab_width, 8);
    });

    it("sets trim_trailing_whitespace = true", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "example.agc"));
      assert.equal(props.trim_trailing_whitespace, true);
    });

    it("sets insert_final_newline = true", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "example.agc"));
      assert.equal(props.insert_final_newline, true);
    });
  });

  describe("[*.md] section", () => {
    let props;

    it("resolves properties for .md files", async () => {
      props = await editorconfig.parse(resolve(ROOT, "README.md"));
      assert.ok(props, "editorconfig must return props for .md files");
    });

    it("sets indent_style = space", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "README.md"));
      assert.equal(props.indent_style, "space");
    });

    it("sets indent_size = 2", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "README.md"));
      assert.equal(props.indent_size, 2);
    });

    it("sets trim_trailing_whitespace = false for markdown", async () => {
      props ??= await editorconfig.parse(resolve(ROOT, "README.md"));
      assert.equal(
        props.trim_trailing_whitespace,
        false,
        "Markdown files need trim_trailing_whitespace = false to preserve intentional line breaks"
      );
    });
  });
});

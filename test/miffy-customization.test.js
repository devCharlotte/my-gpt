"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const importer = require("../src/codex-pet-importer");
const createCodexPetMain = require("../src/codex-pet-main");
const loginItem = require("../src/login-item");
const settingsIcon = require("../src/settings-window-icon");
const serverConfig = require("../hooks/server-config");

test("miffy import protocol is accepted", () => {
  const parsed = importer.parseClawdImportUrl(
    "miffy://import-pet?url=https%3A%2F%2Fexample.test%2Fpet.json"
  );
  assert.equal(parsed.action, "import-pet");
  assert.equal(parsed.url, "https://example.test/pet.json");
});

test("protocol argv extractor keeps both miffy and legacy clawd links", () => {
  const { extractClawdProtocolUrls } = createCodexPetMain.__test;
  assert.deepEqual(
    extractClawdProtocolUrls([
      "miffy://import-pet?url=https%3A%2F%2Fexample.test%2Fa.json",
      "clawd://import-pet?url=https%3A%2F%2Fexample.test%2Fb.json",
      "--other",
    ]),
    [
      "miffy://import-pet?url=https%3A%2F%2Fexample.test%2Fa.json",
      "clawd://import-pet?url=https%3A%2F%2Fexample.test%2Fb.json",
    ]
  );
});

test("platform identity and startup files use the Miffy product name", () => {
  assert.equal(settingsIcon.WINDOWS_APP_USER_MODEL_ID, "com.hiho01.miffy-coding-mate");
  assert.equal(settingsIcon.SETTINGS_WINDOW_TITLE, "Miffy Coding Mate Settings");
  assert.equal(path.basename(loginItem.AUTOSTART_FILE), "miffy-coding-mate.desktop");
});

test("packaged Miffy executable cannot be mistaken for node.exe", () => {
  assert.equal(
    serverConfig.validateWindowsNodeCandidate(
      "C:\\Program Files\\Miffy Coding Mate\\Miffy Coding Mate.exe"
    ),
    null
  );
});

test("bundled Miffy theme contains all eight state assets", () => {
  const theme = JSON.parse(fs.readFileSync(path.join(root, "themes/miffy/theme.json"), "utf8"));
  assert.equal(theme.name, "Miffy");
  for (const state of ["idle", "thinking", "working", "error", "attention", "notification", "sleeping", "waking"]) {
    assert.ok(theme.states[state], `missing theme state: ${state}`);
  }
});

test("fresh-install code selects Miffy and enables login startup", () => {
  const source = fs.readFileSync(path.join(root, "src/main.js"), "utf8");
  assert.match(source, /snapshot\.theme = "miffy"/);
  assert.match(source, /_writeSystemOpenAtLogin\(true\)/);
  assert.match(source, /fallbackThemeId: "miffy"/);
});

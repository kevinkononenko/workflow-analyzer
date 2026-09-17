import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { promisify } from "node:util";
import { chromium } from "playwright-core";

const execFileAsync = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, "..");
const [inputArgument, outputArgument] = process.argv.slice(2);

if (!inputArgument || !outputArgument) {
  throw new Error(
    "Usage: node scripts/render-diagram.mjs <diagram-source.json> <output-image.png>",
  );
}

const inputPath = resolve(projectRoot, inputArgument);
const outputPath = resolve(projectRoot, outputArgument);
const cliPath = join(projectRoot, "node_modules/.bin/eraser-diagrams");
const chromiumPath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const temporaryDirectory = await mkdtemp(join(tmpdir(), "workflow-inspector-diagram-"));
const htmlPath = join(temporaryDirectory, `${basename(inputPath, ".json")}.html`);

let browser;

try {
  await mkdir(dirname(outputPath), { recursive: true });

  await execFileAsync(cliPath, [
    "render",
    inputPath,
    "--chromium-path",
    chromiumPath,
    "--format",
    "html",
    "--quiet",
    "-o",
    htmlPath,
  ]);

  browser = await chromium.launch({ headless: true, executablePath: chromiumPath });
  const page = await browser.newPage({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 2,
  });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);
  await page.locator("#eraser-scene").screenshot({
    path: outputPath,
    type: "png",
    omitBackground: true,
  });
} finally {
  await browser?.close();
  await rm(temporaryDirectory, { recursive: true, force: true });
}

console.log(`Rendered ${outputPath}`);

// Run with `node scripts/audit-outrank-assets.mjs` after adding homepage assets.
import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("public/assets/outrank");
const manifest = JSON.parse(await readFile(path.join(root, "manifest.json"), "utf8"));
const recorded = new Set(Object.values(manifest).map((url) => decodeURIComponent(url.replace(/^\/assets\/outrank\//, ""))));
const files = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(absolute);
    else if (entry.isFile() && !["manifest.json", "ASSET-LICENSE.md"].includes(entry.name)) {
      files.push(path.relative(root, absolute).replaceAll("\\", "/"));
    }
  }
}
await walk(root);

const errors = [];
for (const [source, url] of Object.entries(manifest)) {
  if (!url.startsWith("/assets/outrank/")) errors.push(`Invalid path: ${source} -> ${url}`);
  const local = decodeURIComponent(url.replace(/^\/assets\/outrank\//, ""));
  if (!files.includes(local)) errors.push(`Missing file: ${source} -> ${url}`);
}
for (const name of files) {
  if (!recorded.has(name)) errors.push(`Unrecorded file: ${name}`);
  const filename = path.join(root, name);
  const size = (await stat(filename)).size;
  if (!size) errors.push(`Empty file: ${name}`);
  const bytes = await readFile(filename);
  const signature = bytes.subarray(0, 12);
  if (/\.png$/i.test(name) && signature.subarray(0, 8).toString("hex") !== "89504e470d0a1a0a") errors.push(`Not PNG: ${name}`);
  if (/\.jpe?g$/i.test(name) && signature.subarray(0, 3).toString("hex") !== "ffd8ff") errors.push(`Not JPEG: ${name}`);
  if (/\.webp$/i.test(name) && (signature.toString("ascii", 0, 4) !== "RIFF" || signature.toString("ascii", 8, 12) !== "WEBP")) errors.push(`Not WebP: ${name}`);
  if (/\.mp4$/i.test(name) && signature.toString("ascii", 4, 8) !== "ftyp") errors.push(`Not MP4: ${name}`);
  if (/\.svg$/i.test(name) && !bytes.toString("utf8").includes("<svg")) errors.push(`Not SVG: ${name}`);
  if (size > 1_000_000) console.log(`${name}: ${(size / 1_000_000).toFixed(2)} MB`);
}
console.log(`${files.length} assets, ${Object.keys(manifest).length} manifest entries, ${errors.length} errors`);
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
}

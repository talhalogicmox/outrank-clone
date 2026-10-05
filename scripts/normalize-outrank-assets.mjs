// Run after downloading assets: match extensions to bytes and keep card portraits small.
import { readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const folder = path.resolve("public/assets/outrank/testimonials");
// The root-level favicon file convention overrides page icons in Next.js.
// Keep the original URL for DevPulse while allowing / to choose its own icon.
const inheritedFavicon = path.resolve("app/favicon.ico");
if (await stat(inheritedFavicon).catch(() => null)) {
  await rename(inheritedFavicon, path.resolve("public/favicon.ico"));
}
const mislabeled = path.join(folder, "V-kster-rp.png");
if (await stat(mislabeled).catch(() => null)) {
  const corrected = path.join(folder, "V-kster-rp.jpg");
  await unlink(corrected).catch((error) => {
    if (error.code !== "ENOENT") throw error;
  });
  await rename(mislabeled, corrected);
}
const manifestPath = path.resolve("public/assets/outrank/manifest.json");
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
manifest["Vækster rp.png"] = "/assets/outrank/testimonials/V-kster-rp.jpg";
await writeFile(manifestPath, JSON.stringify(manifest, null, 2) + "\n");

const largePortrait = path.join(folder, "bright-brands-rp.jpg");
if ((await stat(largePortrait)).size > 300_000) {
  const result = await sharp(await readFile(largePortrait))
    .rotate()
    .resize(256, 256, { fit: "cover", withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer();
  await writeFile(largePortrait, result);
}

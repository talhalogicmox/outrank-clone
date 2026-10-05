// Downloads public homepage imagery for local development. Verify redistribution rights before publishing.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const origin = "https://www.outrank.so";
const output = path.resolve("public/assets/outrank");
const html = await fetch(origin, { headers: { "user-agent": "Mozilla/5.0" } }).then((r) => r.text());
const decoded = html.replaceAll("\\u0026", "&").replaceAll("&amp;", "&").replaceAll("\\/", "/");
const paths = new Set(
  [...decoded.matchAll(/(?:\/_next\/static\/media\/[a-zA-Z0-9._-]+\.(?:webp|png|jpg|jpeg|svg)|\/images\/integration-logos\/[a-zA-Z0-9._-]+\.svg)/g)].map((m) => m[0]),
);
for (const name of [
  "card-keyword-chat.057b1f4a.webp", "card-improvements.146fbb57.webp",
  "card-editing.d95495e5.webp", "card-preview.796836e7.webp",
  "card-mentions.e18df500.webp", "card-publish-v2.bb6c6920.webp",
  "ecommerce-card.69f66b33.webp", "card-languages.a7b27740.webp",
  "card-team.178fc446.webp",
]) paths.add(`/_next/static/media/${name}`);
const cdn = new Set(
  [...decoded.matchAll(/https:\/\/cdn\.outrank\.so\/outrank-success-stories-images\/[^"' <>\\]+/g)]
    .map((m) => m[0].split("?")[0]),
);
const classify = (name) => {
  if (/logo|avatar|moonb|AIApply|24hourEDU|Life%20Purpose|bright%20brands|rp\./i.test(name)) return /avatar|rp\.|success-stories/i.test(name) ? "testimonials" : "logos";
  if (/integration|wordpress|webflow|shopify|framer|wix|notion|ghost|webhook|nextjs/i.test(name)) return "integrations";
  if (/story|clients-success/i.test(name)) return "case-studies";
  if (/how-|plan|published|authority|building/i.test(name)) return "how-it-works";
  if (/feature|card-|ecommerce|solutions/i.test(name)) return "features";
  if (/bg-|blur|plur|fiesta/i.test(name)) return "backgrounds";
  if (/icon|arrow|star|check|quote|sparkle|burst|arc/i.test(name)) return "icons";
  return "misc";
};
// Keep the separately sourced video, metadata, portraits, and article images
// recorded by the other download scripts when this downloader is rerun.
const manifest = await readFile(path.join(output, "manifest.json"), "utf8")
  .then(JSON.parse)
  .catch((error) => {
    if (error.code === "ENOENT") return {};
    throw error;
  });
for (const url of [...paths].map((p) => origin + p).concat([...cdn])) {
  try {
    const rawName = decodeURIComponent(url.split("/").pop());
    const name = rawName.replace(/\.[a-f0-9]{8,}\.(webp|png|jpg|jpeg|svg)$/i, ".$1").replace(/[^a-zA-Z0-9._-]/g, "-");
    const folder = classify(url);
    const target = path.join(output, folder, name);
    const res = await fetch(url);
    if (!res.ok) throw new Error(`${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, bytes);
    manifest[rawName] = `/assets/outrank/${folder}/${name}`;
    console.log(folder, name, bytes.length);
  } catch (err) {
    console.error("FAILED", url, err.message);
  }
}
await writeFile(path.join(output, "manifest.json"), JSON.stringify(manifest, null, 2));
const video = await fetch("https://media.outrank.so/Outrank%20Video%20with%20Tibo%20-%20720p.mp4?v=2");
if (video.ok) await writeFile(path.join(output, "misc", "outrank-demo.mp4"), Buffer.from(await video.arrayBuffer()));
console.log("Downloaded", Object.keys(manifest).length, "assets");

import { writeFile } from "node:fs/promises";
const files = [["icon.png","icon.png"],["apple-icon.png","apple-icon.png"],["opengraph-image.png","outrank-og.png"]];
for (const [remote, local] of files) {
  const response = await fetch(`https://www.outrank.so/${remote}`);
  if (!response.ok) throw new Error(`${remote}: ${response.status}`);
  await writeFile(`public/assets/outrank/misc/${local}`, Buffer.from(await response.arrayBuffer()));
  console.log(local);
}

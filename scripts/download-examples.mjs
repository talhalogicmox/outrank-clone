import { mkdir, writeFile } from "node:fs/promises";
const prefix = "https://cdnimg.co/5c5cd1ba-7495-4a35-8310-576d731dc722/";
const sources = [
  "7c91da2b-03d5-4609-98c1-a053a627cccf/how-to-get-paid-on-twitter-social-media-monetization.jpg",
  "09448d7d-ee45-4d98-89df-a40829d9e3fd/supabase-vs-firebase-backend-comparison.jpg",
  "5174906c-e152-4272-bee8-de352a798689/best-ai-video-makers-for-tiktok-ai-tools.jpg",
];
await mkdir("public/assets/outrank/writing-examples", { recursive: true });
for (const name of sources) {
  const response = await fetch(prefix + name);
  if (!response.ok) throw new Error(`${name}: ${response.status}`);
  await writeFile(`public/assets/outrank/writing-examples/${name.split("/")[1]}`, Buffer.from(await response.arrayBuffer()));
  console.log(name);
}

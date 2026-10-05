import { mkdir, stat, writeFile } from "node:fs/promises";
const urls = [
  "twitter-profile-be193ed0-5167-41bd-bbc3-735515988736",
  "2058880837463208081/90683da0-f400-49c9-a460-24127716a5ec-twitter-profile",
  "2103164222347895154/acedd8dc-a424-4a89-b8e2-316c80bb9f96-twitter-profile",
  "2053032780653580323/2f626b9f-cae2-4b59-9f22-5f830dafc6cd-twitter-profile",
  "2099427042504724527/e5d0958c-e09c-4504-b22e-9b4a6a05d753-twitter-profile",
  "2052677372999065922/7a221ad5-6f68-4b86-8c23-69dba8657739-twitter-profile",
  "twitter-profile-38c9c982-8a99-4c3f-84ec-77b9a1e61a82",
  "twitter-profile-1158c94b-7898-4cbf-80dd-c1cd331432f4",
  "2087826728064336361/9c3cf857-6235-47ea-99e7-835a0c0d6714-twitter-profile",
  "twitter-profile-499b7889-ecd9-4b19-bb7e-41a99b3059b4",
  "twitter-profile-b8c338a2-6dc4-4482-b371-68ebd97e7b2b",
  "2087296167457546581/41e9fc2c-0c9c-44ac-95ab-1290460606c5-twitter-profile",
  "twitter-profile-4b098aeb-4e41-4716-b824-f82469383ded",
  "2067944994938458340/8ced18cc-693a-49a8-ae36-e6cff466bc6f-twitter-profile",
  "2064451298523791524/932e505d-e925-4d66-960d-585c34f30be7-twitter-profile",
  "twitter-profile-7d7c2db6-3c6b-4958-a4b9-36a863b81965",
  "2053076409212383313/1e5ef0e9-5197-41b3-939a-9586d333959a-twitter-profile",
  "twitter-profile-4d3753ee-dc7a-4e17-a41c-d2c066b30468",
  "twitter-profile-ed21a821-170f-4f61-9cab-e51da63ab552",
  "2070732803554099291/eebc8066-439f-45c1-a7db-05af61c0cae4-twitter-profile",
];
await mkdir("public/assets/outrank/testimonials", { recursive: true });
for (const [index, url] of urls.entries()) {
  const target = `public/assets/outrank/testimonials/wall-${index}.jpg`;
  if (await stat(target).catch(() => null)) continue;
  const response = await fetch(`https://cdn.testimonial.to/testimonials/${url}`);
  if (!response.ok || !response.headers.get("content-type")?.startsWith("image/jpeg")) {
    throw new Error(`${url}: ${response.status} ${response.headers.get("content-type")}`);
  }
  await writeFile(target, Buffer.from(await response.arrayBuffer()));
  console.log(index, response.headers.get("content-type"));
}

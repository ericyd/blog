import fs from "fs";

const posts = fs.readdirSync("content");

for (const post of posts) {
  const content = fs.readFileSync(`content/${post}`).toString();
  const match = content
    .split("\n")
    .map((line) => line.match(/^slug:\s(.*)$/))
    .filter(Boolean)[0];
  const slug = match[1];
  fs.renameSync(`content/${post}`, `content/${slug}.md`);
}

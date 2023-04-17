import fs from "fs";

const posts = fs.readdirSync("posts");

for (const post of posts) {
  const content = fs.readFileSync(`posts/${post}`).toString();
  const match = content
    .split("\n")
    .map((line) => line.match(/^slug:\s(.*)$/))
    .filter(Boolean)[0];
  const slug = match[1];
  fs.renameSync(`posts/${post}`, `posts/${slug}.md`);
}

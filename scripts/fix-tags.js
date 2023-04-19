import fs from "fs";

const posts = fs.readdirSync("content");

for (const post of posts) {
  const content = fs.readFileSync(`content/${post}`).toString();
  const updated = content
    .split("\n")
    .map((line) => {
      const match = line.match(/^tags:\s(.*)$/);
      if (match) {
        return `tags: [${match[1]}]`;
      } else {
        return line;
      }
    })
    .join("\n");
  fs.writeFileSync(`content/${post}`, updated);
}

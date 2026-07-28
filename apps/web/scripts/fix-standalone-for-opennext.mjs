import fs from "node:fs";
import path from "node:path";

const appDir = process.cwd();
const serverDir = path.join(appDir, ".next/server");
const standaloneServerDir = path.join(
  appDir,
  ".next/standalone/apps/web/.next/server"
);

if (!fs.existsSync(serverDir)) {
  console.warn("No .next/server directory — skipping standalone fix.");
  process.exit(0);
}

fs.mkdirSync(standaloneServerDir, { recursive: true });

for (const file of ["middleware.js", "middleware.js.nft.json", "middleware.js.map"]) {
  const src = path.join(serverDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(standaloneServerDir, file));
  }
}

const nftPath = path.join(serverDir, "middleware.js.nft.json");
if (fs.existsSync(nftPath)) {
  const nft = JSON.parse(fs.readFileSync(nftPath, "utf8"));
  for (const relativeFile of nft.files) {
    if (!relativeFile.startsWith("./")) continue;
    const src = path.join(serverDir, relativeFile.slice(2));
    const dest = path.join(standaloneServerDir, relativeFile.slice(2));
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
    }
  }
}

console.log("Patched standalone output for OpenNext middleware tracing.");

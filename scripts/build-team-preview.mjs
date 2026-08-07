import { spawnSync } from "node:child_process";
import { copyFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceImage = resolve(
  projectRoot,
  "src/assets/about-team-concept.webp"
);
const stagedImage = resolve(
  projectRoot,
  "public/images/about-team-concept.webp"
);
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

mkdirSync(dirname(stagedImage), { recursive: true });
copyFileSync(sourceImage, stagedImage);

let result;

try {
  result = spawnSync(npmCommand, ["run", "build"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      PUBLIC_SHOW_TEAM_CONCEPT: "true",
      PUBLIC_SITE_NOINDEX: "true",
    },
    shell: process.platform === "win32",
    stdio: "inherit",
  });
} finally {
  rmSync(stagedImage, { force: true });
}

if (result?.error) {
  throw result.error;
}

process.exit(result?.status ?? 1);

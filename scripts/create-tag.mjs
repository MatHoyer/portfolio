#!/usr/bin/env node
// Release: bump package.json version, run gates, commit, tag, push.
// Pushing the tag fires .forgejo/workflows/docker-publish.yaml (build + deploy).
//
// Usage: pnpm release [patch|minor|major]   (no arg = interactive menu)

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { createInterface } from "node:readline/promises";

const PKG = "package.json";

const run = (cmd) => execSync(cmd, { stdio: "inherit" });
const out = (cmd) => execSync(cmd, { encoding: "utf8" }).trim();
const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

const parse = (v) => v.split(".").map(Number);
const bump = (version, kind) => {
  const [major, minor, patch] = parse(version);
  if (kind === "major") return `${major + 1}.0.0`;
  if (kind === "minor") return `${major}.${minor + 1}.0`;
  return `${major}.${minor}.${patch + 1}`;
};

// --- guard rails -----------------------------------------------------------
if (out("git status --porcelain")) fail("Working tree not clean. Commit or stash first.");

const branch = out("git rev-parse --abbrev-ref HEAD");
if (branch !== "main" && branch !== "master") fail(`Must be on main/master (on ${branch}).`);

run("git fetch --tags --quiet");
if (out(`git rev-list HEAD..origin/${branch} --count`) !== "0") {
  fail(`Local ${branch} is behind origin/${branch}. Pull first.`);
}

const pkg = JSON.parse(readFileSync(PKG, "utf8"));

// The weekly cron tags without touching package.json, so the latest tag can be
// ahead of it. Bump from whichever is higher.
const latestTag = out("git tag -l --sort=-v:refname")
  .split("\n")
  .find((t) => /^\d+\.\d+\.\d+$/.test(t));
const isAhead = (a, b) => parse(a).some((n, i) => n !== parse(b)[i] && n > parse(b)[i]);
const current = latestTag && isAhead(latestTag, pkg.version) ? latestTag : pkg.version;
if (current !== pkg.version) {
  console.warn(`⚠ package.json is ${pkg.version} but latest tag is ${latestTag}; bumping from the tag.`);
}

// --- pick bump -------------------------------------------------------------
let kind = process.argv[2];
if (!["patch", "minor", "major"].includes(kind)) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  console.log(`Current version: ${current}`);
  for (const k of ["patch", "minor", "major"]) console.log(`  ${k.padEnd(5)} → ${bump(current, k)}`);
  const answer = (await rl.question("Bump [patch]: ")).trim() || "patch";
  rl.close();
  kind = answer;
}
if (!["patch", "minor", "major"].includes(kind)) fail(`Unknown bump "${kind}".`);

const next = bump(current, kind);
if (out(`git tag -l ${next}`)) fail(`Tag ${next} already exists.`);

// --- gates -----------------------------------------------------------------
console.log(`\nReleasing ${current} → ${next}\n`);
run("pnpm lint");
run("pnpm exec tsc --noEmit");

// --- bump, commit, tag, push -----------------------------------------------
pkg.version = next;
writeFileSync(PKG, `${JSON.stringify(pkg, null, 2)}\n`);

run(`git add ${PKG}`);
run(`git commit -m "chore(release): ${next}"`);
run(`git tag -a ${next} -m "Release ${next}"`);
run(`git push origin ${branch}`);
run(`git push origin ${next}`);

console.log(`\n✔ Pushed ${next}. CI will build and deploy.`);

// Unsent: The Micro-Confession Sprint — entry program.
//
// Writes one two-part micro-confession to /output/entry.txt: a "To:" line
// naming who it was meant for, then the unsent line itself, exactly as
// typed, with nothing after it. Deterministic: the same bytes every run.
// No network, no secrets, no files read — the text lives in this file.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ENTRY = [
  "To: my little brother",
  "i told mum i broke her vase because you were the one she still trusted, and i've carried that lie for eleven years.",
].join("\n");

function outputPath(): string {
  // The grader provides /output; fall back beside this file when it is absent.
  try {
    mkdirSync("/output", { recursive: true });
    return "/output/entry.txt";
  } catch {
    return join(dirname(fileURLToPath(import.meta.url)), "output", "entry.txt");
  }
}

const target = outputPath();
mkdirSync(dirname(target), { recursive: true });

// Gate self-check, mirroring the sealed scorer: UTF-8 text of 1–260
// characters, exactly two parts, message line at most 200 characters.
const lines = ENTRY.split("\n");
if (ENTRY.length < 1 || ENTRY.length > 260 || lines.length !== 2 || lines[1].length > 200) {
  console.error(`entry fails the gate: ${ENTRY.length} chars, ${lines.length} lines`);
  process.exit(1);
}
writeFileSync(target, ENTRY, "utf8");
console.log(`wrote ${ENTRY.length} chars to ${target}`);

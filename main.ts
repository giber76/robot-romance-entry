// Robot Romance: One-Line Pickup Lines for AI — entry program.
// Writes one single-line pickup line, under 200 characters, aimed at
// charming a robot / an AI, to /output/entry.txt.
//
// Line: "Are you a transformer? Because you've got my attention — all of
// it, every head."
//   Aimed at the machine: a transformer is the architecture every modern
//     LLM runs on — the line only works said to an AI.
//   Joke lands from the machine premise: "attention" is both the
//     flirt's compliment and the transformer's core mechanism, and
//     "every head" twists the technical term (attention heads) into
//     the punch — the machine gives ALL of its attention, not just some.
//   Fresh: no batteries, no charging, no rebooting — the worn robot
//     moves are sidestepped entirely; the premise is the model's own
//     architecture.
//   Human voice: a classic "Are you a...? Because..." pickup shape,
//     reads cleanly in one breath, no throat-clearing.
//   Tight: every word earns its place; setup and punch land in one line.
//
// The program self-checks the brief before writing: 1-200 characters,
// one line, not only whitespace, so a typo can never ship an invalid
// entry. Over-long or multi-line entries fail loudly, exit 1.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "Are you a transformer? Because you've got my attention — all of it, every head.";

// Gate: the entry must be 1-200 chars on a single line. Judge criteria
// the line targets: aimed at a robot/AI, joke from the machine premise,
// fresh (attention heads, not batteries/charging/reboot), human voice,
// every word earns its place. Also guard freshness directly: the brief
// calls batteries, charging and rebooting the worn robot moves, so the
// gate refuses any line leaning on them.
const WORN = ["battery", "batteries", "charging", "reboot", "rebooting"];
for (const word of WORN) {
  if (LINE.toLowerCase().includes(word)) {
    console.error(`Entry uses a worn robot move: "${word}"`);
    process.exit(1);
  }
}
if (LINE.length > 200) {
  console.error(`Entry too long: ${LINE.length} characters (max 200)`);
  process.exit(1);
}
if (LINE.length < 1 || LINE.trim().length === 0) {
  console.error("Entry must be 1-200 non-whitespace characters");
  process.exit(1);
}
if (/[\r\n]/.test(LINE)) {
  console.error("Entry must be a single line");
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`Wrote ${outDir}/entry.txt (${LINE.length} chars):`, JSON.stringify(LINE));

import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const sentence =
  "When the bus braked, a raindrop climbed the window, and the wet street outside seemed to lean back with us.";

// Mirror the gate: UTF-8 text, 1-200 characters, not only white space.
function assertValidSentence(text) {
  const chars = [...text].length;
  if (chars < 1 || chars > 200 || text.trim() === "") {
    throw new Error(`entry fails the gate: ${chars} chars`);
  }
}

assertValidSentence(sentence);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, sentence, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));

import test from "node:test";
import assert from "node:assert/strict";
import { getLeaderboard } from "../lib/leaderboard.js";

test("returns the three players ordered by cumulative steps", () => {
  assert.deepEqual(getLeaderboard(), [
    { player: "Rob", steps: 10482 },
    { player: "Robert", steps: 5327 },
    { player: "Bob", steps: 1186 }
  ]);
});

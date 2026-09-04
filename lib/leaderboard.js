export const leaderboard = [
  { player: "Rob", steps: 10482 },
  { player: "Robert", steps: 5327 },
  { player: "Bob", steps: 1186 }
];

export function getLeaderboard() {
  return [...leaderboard].sort((a, b) => b.steps - a.steps);
}

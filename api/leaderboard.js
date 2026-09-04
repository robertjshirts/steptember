import { getLeaderboard } from "../lib/leaderboard.js";

export default function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    return response.status(405).json({ error: "Method not allowed" });
  }

  response.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
  return response.status(200).json({ leaderboard: getLeaderboard() });
}

export interface LeaderboardEntry {
  playerName: string;
  score:      number;
  date:       string; // ISO 8601
}

export type Leaderboard = LeaderboardEntry[];

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Leaderboard, LeaderboardEntry } from '../domain/leaderboard';
import { GAME_CONFIG } from '../config/gameConfig';

interface LeaderboardStore {
  entries:          Leaderboard;
  submitScore:      (playerName: string, score: number) => void;
  clearLeaderboard: () => void;
}

function insertAndRank(current: Leaderboard, entry: LeaderboardEntry, limit: number): Leaderboard {
  return [...current, entry]
    .sort((a, b) => b.score - a.score || a.date.localeCompare(b.date))
    .slice(0, limit);
}

export const useLeaderboardStore = create<LeaderboardStore>()(
  persist(
    (set) => ({
      entries: [],

      submitScore: (playerName: string, score: number) => {
        const entry: LeaderboardEntry = { playerName, score, date: new Date().toISOString() };
        set((state) => ({ entries: insertAndRank(state.entries, entry, GAME_CONFIG.LEADERBOARD_SIZE) }));
      },

      clearLeaderboard: () => set({ entries: [] }),
    }),
    { name: 'hand-betting-leaderboard' },
  ),
);

export const selectEntries     = (s: LeaderboardStore) => s.entries;
export const selectSubmitScore = (s: LeaderboardStore) => s.submitScore;

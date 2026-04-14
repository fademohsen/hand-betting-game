import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { GAME_CONFIG } from '../config/gameConfig';
import { Leaderboard, LeaderboardEntry } from '../domain/leaderboard';

// ─── Store interface ──────────────────────────────────────────────────────────

interface LeaderboardStore {
  entries: Leaderboard;
  submitScore: (playerName: string, score: number) => void;
  clearLeaderboard: () => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function insertAndRank(
  current: Leaderboard,
  entry:   LeaderboardEntry,
  limit:   number,
): Leaderboard {
  return [...current, entry]
    .sort((a, b) => b.score - a.score || a.date.localeCompare(b.date))
    .slice(0, limit);
}

// ─── Store ────────────────────────────────────────────────────────────────────

export const useLeaderboardStore = create<LeaderboardStore>()(
  persist(
    (set) => ({
      entries: [],

      /**
       * Adds a new score entry and keeps only the top N scores.
       * Ties are broken by submission date (earlier date ranks higher).
       */
      submitScore: (playerName: string, score: number) => {
        const entry: LeaderboardEntry = {
          playerName,
          score,
          date: new Date().toISOString(),
        };

        set((state) => ({
          entries: insertAndRank(state.entries, entry, GAME_CONFIG.LEADERBOARD_SIZE),
        }));
      },

      clearLeaderboard: () => set({ entries: [] }),
    }),
    {
      name: 'hand-betting-leaderboard', // localStorage key
    },
  ),
);

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectEntries     = (s: LeaderboardStore) => s.entries;
export const selectSubmitScore = (s: LeaderboardStore) => s.submitScore;

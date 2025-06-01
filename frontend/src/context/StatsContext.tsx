import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface StatsState {
  wins: number;
  losses: number;
  ties: number;
  totalGames: number;
}

interface StatsContextProps extends StatsState {
  recordWin: () => void;
  recordLoss: () => void;
  recordTie: () => void;
  resetStats: () => void;
}

const defaultStats: StatsState = {
  wins: 0,
  losses: 0,
  ties: 0,
  totalGames: 0,
};

const StatsContext = createContext<StatsContextProps>({
  ...defaultStats,
  recordWin: () => {},
  recordLoss: () => {},
  recordTie: () => {},
  resetStats: () => {},
});

export function useStats(): StatsContextProps {
  return useContext(StatsContext);
}

export function StatsProvider({ children }: { children: ReactNode }) {
  const [stats, setStats] = useState<StatsState>(() => {
    try {
      const stored = localStorage.getItem('gameStats');
      return stored ? (JSON.parse(stored) as StatsState) : defaultStats;
    } catch {
      return defaultStats;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('gameStats', JSON.stringify(stats));
    } catch {
        console.error('Failed to save stats to localStorage');}
  }, [stats]);

  const recordWin = () =>
      setStats((prev) => ({
        wins: prev.wins + 1,
        losses: prev.losses,
        ties: prev.ties,
        totalGames: prev.totalGames + 1,
      }));

  const recordLoss = () =>
      setStats((prev) => ({
        wins: prev.wins,
        losses: prev.losses + 1,
        ties: prev.ties,
        totalGames: prev.totalGames + 1,
      }));

  const recordTie = () =>
      setStats((prev) => ({
        wins: prev.wins,
        losses: prev.losses,
        ties: prev.ties + 1,
        totalGames: prev.totalGames + 1,
      }));

  const resetStats = () => setStats(defaultStats);

  return (
      <StatsContext.Provider value={{ ...stats, recordWin, recordLoss, recordTie, resetStats }}>
        {children}
      </StatsContext.Provider>
  );
}

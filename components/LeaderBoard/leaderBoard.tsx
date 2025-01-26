'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trophy, Gamepad2, Loader2 } from 'lucide-react';
import { getGameIcon } from '../Scores/GameIcon';

interface LeaderboardEntry {
  user: string;
  score: number;
  rank?: number;
  reward?: number;
}

export const LeaderBoard: React.FC = () => {
  const [activeGame, setActiveGame] = useState<string>('spaceShotter');
  const [loading, setLoading] = useState<boolean>(true);
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const games = [
    'spaceShotter',
    'carGame',
    'MarioGo',
    'snakeGame',
    'Rail Rush',
    'zoomLand',
  ];

  const getScores = async (game: string) => {
    setLoading(true);
    setActiveGame(game);
    setError(null);
    setIsMobileMenuOpen(false);

    try {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/api/games/getAllScores?game=${game}`;
      const response = await axios.get(url);

      if (response.status === 200) {
        const rankedScores = response.data
          .sort((a: LeaderboardEntry, b: LeaderboardEntry) => b.score - a.score)
          .map((entry: LeaderboardEntry, index: number) => ({
            ...entry,
            rank: index + 1,
          }));

        setScores(rankedScores);
      }
    } catch (error) {
      console.error('Error fetching leaderboard scores:', error);
      setError('Failed to load scores. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getScores('spaceShotter');
  }, []);

  return (
    <div className={`${isMobileMenuOpen ? 'mt-20' : ''} mt-10 min-h-screen bg-gray-50 p-4 flex items-center justify-center`}>
      <div className="w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Mobile Game Selection Toggler */}
        <div className="md:hidden flex items-center justify-between bg-gray-100 p-4">
          <div className="flex items-center">
            <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
            <h2 className="text-xl font-bold text-gray-800">{activeGame} Leaderboard</h2>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-600 hover:text-blue-500"
            aria-label="Toggle mobile menu"
          >
            {!isMobileMenuOpen && <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>}

          </button>
        </div>

        <div className="flex flex-col md:flex-row relative">
          {/* Game Selection Column - Mobile Dropdown */}
          <div
            className={`md:w-1/3 bg-gray-100 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block relative md:static z-10 w-full md:w-auto md:rounded-l-xl`}
          >
            <div className="p-4">
              <div className="hidden md:flex items-center mb-6">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Games</h2>
              </div>
              <div className="space-y-2">
                {games.map((game) => (
                  <button
                    key={game}
                    onClick={() => getScores(game)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-all duration-200 flex items-center space-x-3 ${activeGame === game
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {/* <Gamepad2 className="w-5 h-5" /> */}
                    {getGameIcon(game)}
                    <span className="font-medium">{game}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Leaderboard Scores Column */}
          <div className="md:w-2/3 p-4 md:p-6 relative">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 hidden md:block">
              {activeGame} Leaderboard
            </h3>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading scores...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center py-4">{error}</div>
            ) : (
              <div className="divide-y divide-gray-200">
                {scores.length === 0 ? (
                  <p className="text-center text-gray-500">No scores available</p>
                ) : (
                  scores.slice(0, 10).map((entry) => (
                    <div
                      key={`${entry.user}-${entry.score}`}
                      className="flex flex-col md:flex-row items-center justify-between py-3 space-y-2 md:space-y-0"
                    >
                      <div className="flex items-center space-x-3 w-full md:w-auto">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${entry.rank === 1
                            ? 'bg-yellow-400 text-white'
                            : entry.rank === 2
                              ? 'bg-gray-300 text-gray-800'
                              : entry.rank === 3
                                ? 'bg-yellow-700 text-white'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                        >
                          {entry.rank}
                        </span>
                        <span className="font-medium text-gray-800">{entry.user}</span>
                      </div>
                      <div className="flex items-center space-x-4 w-full md:w-auto justify-between md:justify-end">
                        <span className="text-blue-600 font-semibold">
                          Score: {entry.score}
                        </span>
                        <span className="text-gray-500 font-medium">
                          Tokens: {entry.reward}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default LeaderBoard;
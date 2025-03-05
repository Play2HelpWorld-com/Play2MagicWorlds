import { useState } from "react";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  return (
    <div className="mt-10 flex flex-col items-center">
      <h1 className="mb-4 text-2xl font-bold">Tic-Tac-Toe</h1>
      <div className="grid grid-cols-3 gap-2">
        {board.map((cell, index) => (
          <button
            key={index}
            className="flex h-16 w-16 items-center justify-center border border-gray-500 text-2xl font-bold"
            onClick={() => handleClick(index)}
          >
            {cell}
          </button>
        ))}
      </div>
      <p className="mt-4 text-lg font-semibold">
        {winner ? `Winner: ${winner}` : `Next Player: ${xIsNext ? "X" : "O"}`}
      </p>
      <button
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

const calculateWinner = (board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

export default TicTacToe;

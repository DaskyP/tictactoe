/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReturnButton from "../components/ReturnButton";

function Square({ value, onSquareClick }) {
  return (
    <button className="w-16 h-16 text-2xl font-bold flex items-center justify-center border border-red-500 bg-gray-800 text-white hover:bg-red-600 transition" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    onPlay(i);
  }

  return (
    <div className="grid grid-cols-3 gap-2 w-48">
      {squares.map((square, i) => (
        <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
      ))}
    </div>
  );
}

export default function GameVsPC() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);

  useEffect(() => {
    if (!isPlayerTurn) {
      const emptySquares = squares.map((v, i) => (v === null ? i : null)).filter(v => v !== null);
      if (emptySquares.length > 0) {
        const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
        setTimeout(() => {
          const newSquares = [...squares];
          newSquares[randomMove] = "O";
          setSquares(newSquares);
          setIsPlayerTurn(true);
        }, 500);
      }
    }
  }, [isPlayerTurn, squares]);

  function handlePlay(index) {
    if (!isPlayerTurn || squares[index]) return;
    const newSquares = [...squares];
    newSquares[index] = "X";
    setSquares(newSquares);
    setIsPlayerTurn(false);
  }

  const winner = calculateWinner(squares);
  let status = winner ? `Ganador: ${winner}` : isPlayerTurn ? "Tu turno" : "Turno de la IA";

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-white">
      <ReturnButton />
      <h1 className="text-3xl font-bold mb-8">Tic-Tac-Toe vs PC</h1>
      <div className="flex gap-8 items-start">
        <div className="game-info w-48 bg-gray-900 text-white p-4 rounded-lg border border-red-500 shadow-lg shadow-red-500/50 overflow-y-auto max-h-96">
          <div className="mb-4 text-lg font-semibold">{status}</div>
        </div>
        <Board squares={squares} onPlay={handlePlay} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return squares.includes(null) ? null : "Empate";
}

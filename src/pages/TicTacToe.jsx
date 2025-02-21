/* eslint-disable react/prop-types */
import { useState } from "react";
import ReturnButton from "../components/ReturnButton";

function Square({ value, onSquareClick }) {
  return (
    <button className="w-16 h-16 text-2xl font-bold flex items-center justify-center border border-red-500 bg-gray-800 text-white hover:bg-red-600 transition" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status = winner ? `Ganador: ${winner}` : `Siguiente jugador: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="flex gap-8 items-start">
      <div className="game-info w-48 bg-gray-900 text-white p-4 rounded-lg border border-red-500 shadow-lg shadow-red-500/50 overflow-y-auto max-h-96">
        <div className="mb-4 text-lg font-semibold">{status}</div>
      </div>
      <div className="grid grid-cols-3 gap-2 w-48">
        {squares.map((square, i) => (
          <Square key={i} value={square} onSquareClick={() => handleClick(i)} />
        ))}
      </div>
    </div>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description = move > 0 ? `Ir al movimiento #${move}` : 'Ir al inicio del juego';
    return (
      <li key={move}>
        <button className="text-red-400 hover:text-red-600" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
    <ReturnButton />
      <h1 className="text-3xl font-bold mb-8">Tic-Tac-Toe</h1>
      <div className="flex gap-8 items-start">
        <div className="w-48 bg-gray-900 text-white p-4 rounded-lg border border-red-500 shadow-lg shadow-red-500/50 overflow-y-auto max-h-96">
          <ol>{moves}</ol>
        </div>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
    </div>
  );
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

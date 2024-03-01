import React, { useState, useEffect } from 'react';

import Board from './components/Board';
import ScoreBoard from './components/ScoreBoard';
import ResetButton from './components/ResetButton';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {

  const WinPossibily = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  const [board, setBoard] = useState(Array(9).fill(null));

  const [xPlaying, setXPlaying] = useState(true);

  const [score, setScore] = useState({ xScore: 0, oScore: 0 })

  const [gameOver, setGameOver] = useState(false)

  useEffect(() => {
    if (gameOver) {
      const winner = checkWinner(board);
      if (winner === 'Tie') {
        toast.info('Match is a tie!', {
          autoClose: 2000,
        });
      } else if (winner) {
        const winningPlayer = winner === 'X' ? 'Player X' : 'Player O';
        toast.success(`${winningPlayer} wins!`, {
          autoClose: 2000,
        });
      }
    }
  }, [gameOver]);

  const handleBoxClick = (boxIndex) => {
    const updatedBoard = board.map((value, index) => {
      if (index === boxIndex)
        return xPlaying ? 'X' : 'O';
      else
        return value;
    })

    const winner = checkWinner(updatedBoard);

    if (winner) {
      if (winner === 'O') {
        let { oScore } = score;
        oScore += 1;
        setScore({ ...score, oScore })
      } else if (winner === 'X') {
        let { xScore } = score;
        xScore += 1;
        setScore({ ...score, xScore })
      }
    }
    console.log(score);

    setBoard(updatedBoard);
    setXPlaying(!xPlaying);
  }

  const checkWinner = (board) => {
    for (let i = 0; i < WinPossibily.length; i++) {
      const [x, y, z] = WinPossibily[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z]) {
        setGameOver(true);
        return board[x];
      }
    }

    // Check for a draw
    if (board.every((value) => value !== null)) {
      setGameOver(true);
      return 'Tie';
    }
    return null;
  };

  const resetBoard = () => {
    setGameOver(false);
    setBoard(Array(9).fill(null))
  }

  return (
    <div>
      <h1>Tic <span>Tac</span> Toe</h1>
      <ScoreBoard score={[score.xScore, score.oScore]} xPlaying={xPlaying} />
      <Board board={board} onClick={gameOver ? resetBoard : handleBoxClick} />
      <ResetButton resetBoard={resetBoard} />
      <ToastContainer position="top-right" />
    </div>
  )
}

export default App;
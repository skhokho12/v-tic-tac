export const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]

export const createEmptyBoard = () => Array(9).fill(null)

export const getAvailableMoves = (board) =>
  board.reduce((moves, cell, index) => {
    if (cell === null) {
      moves.push(index)
    }
    return moves
  }, [])

export const checkWinner = (board) => {
  for (const combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningLine: combination,
      }
    }
  }

  return {
    winner: null,
    winningLine: [],
  }
}

export const isDraw = (board) => board.every((cell) => cell !== null)

const findImmediateMove = (board, symbol) => {
  for (const move of getAvailableMoves(board)) {
    const nextBoard = [...board]
    nextBoard[move] = symbol
    if (checkWinner(nextBoard).winner === symbol) {
      return move
    }
  }

  return null
}

export const getComputerMove = (board, computerSymbol = 'O', humanSymbol = 'X') => {
  const availableMoves = getAvailableMoves(board)
  if (availableMoves.length === 0) {
    return null
  }

  // Priority 1: win immediately if possible.
  const winningMove = findImmediateMove(board, computerSymbol)
  if (winningMove !== null) {
    return winningMove
  }

  // Priority 2: block immediate human win.
  const blockingMove = findImmediateMove(board, humanSymbol)
  if (blockingMove !== null) {
    return blockingMove
  }

  // Priority 3: pick a random legal move.
  const randomIndex = Math.floor(Math.random() * availableMoves.length)
  return availableMoves[randomIndex]
}

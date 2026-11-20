import { checkWinner, createEmptyBoard, isDraw } from '../utils/gameLogic'

export const GAME_MODES = {
  PLAYER_VS_PLAYER: 'PVP',
  PLAYER_VS_COMPUTER: 'PVC',
}

export const ACTIONS = {
  SET_GAME_MODE: 'SET_GAME_MODE',
  SET_PLAYER_NAMES: 'SET_PLAYER_NAMES',
  START_GAME: 'START_GAME',
  MAKE_MOVE: 'MAKE_MOVE',
  COMPUTER_MOVE: 'COMPUTER_MOVE',
  RESET_GAME: 'RESET_GAME',
  RESET_SCORES: 'RESET_SCORES',
  PLAY_AGAIN: 'PLAY_AGAIN',
}

export const DEFAULT_NAMES = {
  X: 'Player 1',
  O: 'Player 2',
}

const normalizeName = (value, fallback) => {
  const cleanValue = value.trim()
  return cleanValue.length > 0 ? cleanValue : fallback
}

const getDefaultState = () => ({
  board: createEmptyBoard(),
  currentPlayer: 'X',
  winner: null,
  winningLine: [],
  isDraw: false,
  status: 'Next Player: X',
  gameMode: GAME_MODES.PLAYER_VS_PLAYER,
  players: {
    X: DEFAULT_NAMES.X,
    O: DEFAULT_NAMES.O,
  },
  scores: {
    X: 0,
    O: 0,
  },
  hasStarted: false,
  isComputerThinking: false,
})

export const initialState = getDefaultState()

const buildStatus = ({ winner, isDraw: draw, currentPlayer, players, isComputerThinking }) => {
  if (winner) {
    return `Congratulations ${players[winner]}! You won!`
  }

  if (draw) {
    return 'Draw!'
  }

  if (isComputerThinking) {
    return `${players.O} is thinking...`
  }

  return `${players[currentPlayer]}'s Turn (${currentPlayer})`
}

const applyMove = (state, index, symbol) => {
  // Guard rails are kept in reducer so invalid state transitions are impossible.
  if (!state.hasStarted || state.winner || state.isDraw || state.board[index] !== null) {
    return state
  }

  if (state.currentPlayer !== symbol) {
    return state
  }

  const updatedBoard = [...state.board]
  updatedBoard[index] = symbol

  const { winner, winningLine } = checkWinner(updatedBoard)
  const draw = !winner && isDraw(updatedBoard)

  const nextPlayer = symbol === 'X' ? 'O' : 'X'
  const updatedScores = winner
    ? {
        ...state.scores,
        [winner]: state.scores[winner] + 1,
      }
    : state.scores

  const isComputerThinking =
    !winner &&
    !draw &&
    state.gameMode === GAME_MODES.PLAYER_VS_COMPUTER &&
    nextPlayer === 'O'

  const nextState = {
    ...state,
    board: updatedBoard,
    currentPlayer: nextPlayer,
    winner,
    winningLine,
    isDraw: draw,
    scores: updatedScores,
    isComputerThinking,
  }

  return {
    ...nextState,
    status: buildStatus(nextState),
  }
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_GAME_MODE: {
      const gameMode = action.payload
      const isComputerMode = gameMode === GAME_MODES.PLAYER_VS_COMPUTER
      const updatedPlayers = {
        ...state.players,
        O: isComputerMode ? 'Computer' : state.players.O,
      }

      const nextState = {
        ...state,
        board: createEmptyBoard(),
        currentPlayer: 'X',
        winner: null,
        winningLine: [],
        isDraw: false,
        hasStarted: false,
        isComputerThinking: false,
        gameMode,
        players: updatedPlayers,
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    case ACTIONS.SET_PLAYER_NAMES: {
      const { playerX, playerO } = action.payload
      const isComputerMode = state.gameMode === GAME_MODES.PLAYER_VS_COMPUTER
      const nextPlayers = {
        X: normalizeName(playerX, DEFAULT_NAMES.X),
        O: isComputerMode ? 'Computer' : normalizeName(playerO, DEFAULT_NAMES.O),
      }

      const nextState = {
        ...state,
        players: nextPlayers,
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    case ACTIONS.START_GAME: {
      const freshBoard = createEmptyBoard()
      const nextState = {
        ...state,
        board: freshBoard,
        currentPlayer: 'X',
        winner: null,
        winningLine: [],
        isDraw: false,
        hasStarted: true,
        isComputerThinking: false,
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    case ACTIONS.MAKE_MOVE:
      if (state.gameMode === GAME_MODES.PLAYER_VS_COMPUTER && state.currentPlayer === 'O') {
        return state
      }
      return applyMove(state, action.payload, state.currentPlayer)

    case ACTIONS.COMPUTER_MOVE:
      return applyMove(state, action.payload, 'O')

    case ACTIONS.RESET_GAME: {
      const nextState = {
        ...state,
        board: createEmptyBoard(),
        currentPlayer: 'X',
        winner: null,
        winningLine: [],
        isDraw: false,
        hasStarted: true,
        isComputerThinking: false,
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    case ACTIONS.PLAY_AGAIN: {
      const nextState = {
        ...state,
        board: createEmptyBoard(),
        currentPlayer: 'X',
        winner: null,
        winningLine: [],
        isDraw: false,
        hasStarted: true,
        isComputerThinking: false,
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    case ACTIONS.RESET_SCORES: {
      const nextState = {
        ...state,
        scores: {
          X: 0,
          O: 0,
        },
      }

      return {
        ...nextState,
        status: buildStatus(nextState),
      }
    }

    default:
      return state
  }
}

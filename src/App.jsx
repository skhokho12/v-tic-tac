import { useEffect, useMemo, useReducer, useState } from 'react'
import './App.css'
import GameBoard from './components/GameBoard'
import GameControls from './components/GameControls'
import GameSetup from './components/GameSetup'
import GameStatus from './components/GameStatus'
import PlayerCard from './components/PlayerCard'
import ScoreBoard from './components/ScoreBoard'
import { ACTIONS, GAME_MODES, gameReducer, initialState } from './reducer/gameReducer'
import { getComputerMove } from './utils/gameLogic'

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)
  const [showSetup, setShowSetup] = useState(true)
  const [nameFallbackMessage, setNameFallbackMessage] = useState('')

  const isComputerMode = state.gameMode === GAME_MODES.PLAYER_VS_COMPUTER
  const isRoundOver = Boolean(state.winner) || state.isDraw

  const canonicalStatus = useMemo(() => {
    if (state.winner) {
      return `Winner: ${state.winner}`
    }

    if (state.isDraw) {
      return 'Draw!'
    }

    return `Next Player: ${state.currentPlayer}`
  }, [state.currentPlayer, state.isDraw, state.winner])

  useEffect(() => {
    if (!state.hasStarted || !state.isComputerThinking || !isComputerMode || state.winner || state.isDraw) {
      return undefined
    }

    const timer = setTimeout(() => {
      const moveIndex = getComputerMove(state.board, 'O', 'X')
      if (moveIndex !== null) {
        dispatch({ type: ACTIONS.COMPUTER_MOVE, payload: moveIndex })
      }
    }, 600)

    return () => clearTimeout(timer)
  }, [
    state.board,
    state.gameMode,
    state.hasStarted,
    state.isComputerThinking,
    state.isDraw,
    state.winner,
    isComputerMode,
  ])

  const handleStart = ({ playerX, playerO }) => {
    const emptyEntries = []
    if (playerX.trim().length === 0) {
      emptyEntries.push('Player 1')
    }
    if (!isComputerMode && playerO.trim().length === 0) {
      emptyEntries.push('Player 2')
    }

    if (emptyEntries.length > 0) {
      setNameFallbackMessage(
        `${emptyEntries.join(' and ')} name${emptyEntries.length > 1 ? 's were' : ' was'} empty, so defaults were used.`,
      )
    } else {
      setNameFallbackMessage('')
    }

    dispatch({
      type: ACTIONS.SET_PLAYER_NAMES,
      payload: {
        playerX,
        playerO,
      },
    })
    dispatch({ type: ACTIONS.START_GAME })
    setShowSetup(false)
  }

  const handleSquareClick = (index) => {
    dispatch({ type: ACTIONS.MAKE_MOVE, payload: index })
  }

  const handleRestart = () => {
    dispatch({ type: ACTIONS.RESET_GAME })
  }

  const handlePlayAgain = () => {
    dispatch({ type: ACTIONS.PLAY_AGAIN })
  }

  const handleResetScores = () => {
    dispatch({ type: ACTIONS.RESET_SCORES })
  }

  const handleModeChange = (mode) => {
    dispatch({ type: ACTIONS.SET_GAME_MODE, payload: mode })
    setShowSetup(true)
  }

  return (
    <main className="app-shell">
      <div className="ambient ambient-a" aria-hidden="true"></div>
      <div className="ambient ambient-b" aria-hidden="true"></div>

      <section className="game-panel">
        <header className="game-header">
          <h1>Tic-Tac</h1>
          <p></p>
          <div className="mode-switcher">
            <label htmlFor="globalMode">Mode</label>
            <select
              id="globalMode"
              value={state.gameMode}
              onChange={(event) => handleModeChange(event.target.value)}
            >
              <option value={GAME_MODES.PLAYER_VS_PLAYER}>Player vs Player</option>
              <option value={GAME_MODES.PLAYER_VS_COMPUTER}>Player vs Computer</option>
            </select>
          </div>
        </header>

        {showSetup && (
          <GameSetup
            initialPlayers={state.players}
            gameMode={state.gameMode}
            onStart={handleStart}
            onModeChange={handleModeChange}
          />
        )}

        {nameFallbackMessage && <p className="fallback-note">{nameFallbackMessage}</p>}

        <section className="player-cards">
          <PlayerCard
            name={state.players.X}
            symbol="X"
            score={state.scores.X}
            isActive={state.hasStarted && state.currentPlayer === 'X' && !isRoundOver}
            isComputer={false}
          />
          <PlayerCard
            name={state.players.O}
            symbol="O"
            score={state.scores.O}
            isActive={state.hasStarted && state.currentPlayer === 'O' && !isRoundOver}
            isComputer={isComputerMode}
          />
        </section>

        <GameStatus
          status={state.status}
          winner={state.winner}
          isDraw={state.isDraw}
          canonicalStatus={canonicalStatus}
        />

        <GameBoard
          board={state.board}
          onSquareClick={handleSquareClick}
          disabled={!state.hasStarted || isRoundOver || (isComputerMode && state.currentPlayer === 'O')}
          winningLine={state.winningLine}
        />

        <ScoreBoard players={state.players} scores={state.scores} />

        <GameControls
          onRestart={handleRestart}
          onResetScores={handleResetScores}
          canPlayAgain={isRoundOver}
          onPlayAgain={handlePlayAgain}
          onEditSetup={() => setShowSetup((previous) => !previous)}
        />

        {!state.hasStarted && !showSetup && (
          <p className="start-hint">Open setup and press Start Game to begin.</p>
        )}
      </section>
    </main>
  )
}

export default App

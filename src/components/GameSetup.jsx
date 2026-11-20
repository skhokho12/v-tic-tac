import { useState } from 'react'
import { GAME_MODES } from '../reducer/gameReducer'

function GameSetup({ initialPlayers, gameMode, onStart, onModeChange }) {
  const [playerX, setPlayerX] = useState(initialPlayers.X)
  const [playerO, setPlayerO] = useState(gameMode === GAME_MODES.PLAYER_VS_COMPUTER ? 'Computer' : initialPlayers.O)

  const isComputerMode = gameMode === GAME_MODES.PLAYER_VS_COMPUTER

  const handleModeChange = (event) => {
    const mode = event.target.value
    onModeChange(mode)

    if (mode === GAME_MODES.PLAYER_VS_COMPUTER) {
      setPlayerO('Computer')
    } else if (playerO.trim() === '' || playerO === 'Computer') {
      setPlayerO('Player 2')
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onStart({
      playerX,
      playerO,
      gameMode,
    })
  }

  return (
    <section className="setup-card" aria-label="Game Setup">
      <h2>Arcade Setup</h2>
      <form onSubmit={handleSubmit} className="setup-form">
        <label htmlFor="playerX">Player 1 Name (X)</label>
        <input
          id="playerX"
          type="text"
          value={playerX}
          onChange={(event) => setPlayerX(event.target.value)}
          placeholder="Player 1"
          maxLength={24}
        />

        <label htmlFor="gameMode">Game Mode</label>
        <select id="gameMode" value={gameMode} onChange={handleModeChange}>
          <option value={GAME_MODES.PLAYER_VS_PLAYER}>Player vs Player</option>
          <option value={GAME_MODES.PLAYER_VS_COMPUTER}>Player vs Computer</option>
        </select>

        <label htmlFor="playerO">Player 2 Name (O)</label>
        <input
          id="playerO"
          type="text"
          value={isComputerMode ? 'Computer' : playerO}
          onChange={(event) => setPlayerO(event.target.value)}
          placeholder={isComputerMode ? 'Computer' : 'Player 2'}
          maxLength={24}
          disabled={isComputerMode}
        />

        <button type="submit" className="control-btn primary full-width">
          Start Game
        </button>
      </form>
    </section>
  )
}

export default GameSetup

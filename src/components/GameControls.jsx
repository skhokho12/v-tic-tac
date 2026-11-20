function GameControls({ onRestart, onResetScores, canPlayAgain, onPlayAgain, onEditSetup }) {
  return (
    <section className="game-controls">
      <button type="button" onClick={onRestart} className="control-btn secondary">
        Restart Game
      </button>
      <button type="button" onClick={onEditSetup} className="control-btn">
        Edit Setup
      </button>
      <button type="button" onClick={onResetScores} className="control-btn danger">
        Reset Scores
      </button>
      {canPlayAgain && (
        <button type="button" onClick={onPlayAgain} className="control-btn primary">
          Play Again
        </button>
      )}
    </section>
  )
}

export default GameControls

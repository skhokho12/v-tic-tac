function ScoreBoard({ players, scores }) {
  return (
    <section className="score-board" aria-label="Score Board">
      <h3>Scoreboard</h3>
      <div className="score-row">
        <span>{players.X} (X)</span>
        <strong>{scores.X}</strong>
      </div>
      <div className="score-row">
        <span>{players.O} (O)</span>
        <strong>{scores.O}</strong>
      </div>
    </section>
  )
}

export default ScoreBoard

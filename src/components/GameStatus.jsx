function GameStatus({ status, winner, isDraw, canonicalStatus }) {
  return (
    <section className={`game-status ${winner ? 'winner' : ''} ${isDraw ? 'draw' : ''}`}>
      <p>{status}</p>
      <small>{canonicalStatus}</small>
    </section>
  )
}

export default GameStatus

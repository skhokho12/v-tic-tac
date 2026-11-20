function PlayerCard({ name, symbol, score, isActive, isComputer }) {
  return (
    <article className={`player-card ${isActive ? 'active' : ''}`}>
      <header className="player-card-head">
        <h3>{name}</h3>
        <span className="player-symbol">{symbol}</span>
      </header>
      <p className="player-role">{isComputer ? 'Computer Opponent' : 'Human Player'}</p>
      <p className="player-score">Score: {score}</p>
      {isActive && <span className="turn-indicator">Current Turn</span>}
    </article>
  )
}

export default PlayerCard

import useMemoryGame from "../hooks/useMemoryGame";

function GameBoard() {
  const {
    levels,
    currentLevel,
    cards,
    matchedService,
    moves,
    time,
    totalMoves,
    totalTime,
    matchedPairs,
    totalPairs,
    gameStarted,
    gameCompleted,
    isAllLevelsCompleted,
    handleCardClick,
    isCardFlipped,
    isCardMatched,
    nextLevel,
    replayLevel,
    restartGame,
  } = useMemoryGame();

  const currentLevelInfo = levels.find(
    (level) => level.level === currentLevel
  );

  if (isAllLevelsCompleted) {
    return (
      <div
        style={{
          padding: "40px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Congratulations! 🎉</h1>

        <p>You completed all 5 levels!</p>

        <p>
          <strong>Total Moves:</strong> {totalMoves}
        </p>

        <p>
          <strong>Total Time:</strong> {totalTime}s
        </p>

        <button onClick={restartGame}>Play Again</button>
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>AWS Memory Match</h1>

      <div
        style={{
          display: "flex",
          gap: "30px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT SIDE - GAME */}
        <div
          style={{
            flex: 1,
          }}
        >
          {/* GAME STATS */}
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <h2>
              Level {currentLevel} / {levels.length}
            </h2>

            <p>
              Services: {currentLevelInfo?.serviceCount}
            </p>

            <p>
              Cards: {cards.length}
            </p>

            <p>
              Pairs: {matchedPairs} / {totalPairs}
            </p>

            <p>
              Moves: {moves}
            </p>

            <p>
              Time: {time}s
            </p>

            <hr />

            <p>
              <strong>Total Moves:</strong> {totalMoves}
            </p>

            <p>
              <strong>Total Time:</strong> {totalTime}s
            </p>
          </div>

          {/* CARDS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 140px)",
              gap: "16px",
            }}
          >
            {cards.map((card) => {
              const flipped = isCardFlipped(card.cardId);
              const matched = isCardMatched(card.cardId);

              return (
                <button
                  key={card.cardId}
                  onClick={() => handleCardClick(card)}
                  disabled={matched}
                  style={{
                    width: "140px",
                    height: "160px",
                    padding: 0,
                    border: "none",
                    background: "transparent",
                    cursor: matched ? "default" : "pointer",
                    perspective: "1000px",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                      transformStyle: "preserve-3d",
                      transition: "transform 0.6s ease",
                      transform: flipped
                        ? "rotateY(180deg)"
                        : "rotateY(0deg)",
                    }}
                  >
                    {/* CARD FRONT */}
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        background: "#232f3e",
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.2)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "42px",
                          color: "white",
                          fontWeight: "bold",
                        }}
                      >
                        ?
                      </span>
                    </div>

                    {/* CARD BACK */}
                    <div
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg)",
                        background: "white",
                        border: "1px solid #ddd",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                        padding: "10px",
                        boxShadow:
                          "0 4px 10px rgba(0,0,0,0.15)",
                      }}
                    >
                      <img
                        src={card.icon}
                        alt={card.name}
                        width="60"
                        height="60"
                      />

                      <p
                        style={{
                          marginTop: "10px",
                          textAlign: "center",
                          fontSize: "14px",
                        }}
                      >
                        {card.name}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* GAME MESSAGE */}
          {gameStarted && !gameCompleted && (
            <p>
              Keep going! Find all the pairs. 💪
            </p>
          )}

          {/* LEVEL COMPLETED */}
          {gameCompleted && (
            <div style={{ marginTop: "25px" }}>
              <h2>
                Level {currentLevel} Completed! 🎉
              </h2>

              <p>Moves: {moves}</p>

              <p>Time: {time}s</p>

              <button onClick={replayLevel}>
                Replay Level
              </button>

              {currentLevel < levels.length && (
                <button
                  onClick={nextLevel}
                  style={{ marginLeft: "10px" }}
                >
                  Next Level
                </button>
              )}
            </div>
          )}

          {/* RESTART */}
          <button
            onClick={restartGame}
            style={{
              marginTop: "20px",
            }}
          >
            Restart Game
          </button>
        </div>

        {/* RIGHT SIDE - MATCHED SERVICE */}
        <div
          style={{
          width: "300px",
          minHeight: "400px",
          maxHeight: "calc(100vh - 40px)",
          border: "1px solid #ddd",
          borderRadius: "12px",
          padding: "20px",
          boxSizing: "border-box",
 
          position: "sticky",
          top: "20px",
          alignSelf: "flex-start",
          overflowY: "auto",
  }}
>
          <h2>Matched Service</h2>

          {matchedService ? (
            <div>
              <img
                src={matchedService.icon}
                alt={matchedService.name}
                width="80"
                height="80"
              />

              <h3>{matchedService.name}</h3>

              <p>
                <strong>Category:</strong>{" "}
                {matchedService.category}
              </p>

              <p>
                <strong>What:</strong>{" "}
                {matchedService.what}
              </p>

              <p>
                <strong>Why:</strong>{" "}
                {matchedService.why}
              </p>

              <p>
                <strong>Where:</strong>{" "}
                {matchedService.where}
              </p>
            </div>
          ) : (
            <p>
              Match a pair to see information about the AWS
              service here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;
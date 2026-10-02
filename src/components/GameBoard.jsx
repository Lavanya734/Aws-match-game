import { useEffect, useState } from "react";
import useMemoryGame from "../hooks/useMemoryGame";

import MemoryCard from "./MemoryCard";
import GameStats from "./GameStats";
import ServiceInfoPanel from "./ServiceInfoPanel";

import { playLevelComplete } from "../utils/gameSounds";


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


    //DARK MODE
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem("aws-memory-dark-mode") === "true";
    });

    const getGridColumns = (count) => {
        if (count <= 8) return 4;
        if (count <= 16) return 4;
        if (count <= 25) return 5;
        return 6;
    };



    const gridColumns = getGridColumns(cards.length);

    useEffect(() => {
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("aws-memory-dark-mode", darkMode);
    }, [darkMode]);


    // Small celebration whenever a pair is matched
    // useEffect(() => {
    //     if (matchedPairs > matchCount) {
    //         setMatchCount(matchedPairs);
    //         setShowMatch(true);

    //         const timer = setTimeout(() => {
    //             setShowMatch(false);
    //         }, 1400);

    //         return () => clearTimeout(timer);
    //     }
    // }, [matchedPairs, matchCount]);

    // Success Sound Effect

    useEffect(() => {
        if (gameCompleted) {
            playLevelComplete();
        }
    }, [gameCompleted]);

    /*
     * ALL LEVELS COMPLETED
     */
    if (isAllLevelsCompleted) {
        return (
            <main className="game-page">

                <div className="level-complete-overlay">
                    <div className="level-complete-modal final-modal">

                        <div className="celebration-icon">
                            🏆
                        </div>

                        <span className="modal-eyebrow">
                            ALL LEVELS COMPLETE
                        </span>

                        <h1>
                            You did it!
                        </h1>

                        <p className="modal-description">
                            You mastered every AWS memory challenge.
                        </p>

                        <div className="modal-stats">
                            <div>
                                <span>TOTAL MOVES</span>
                                <strong>{totalMoves}</strong>
                            </div>

                            <div>
                                <span>TOTAL TIME</span>
                                <strong>{totalTime}s</strong>
                            </div>
                        </div>

                        <button
                            className="modal-primary-button"
                            onClick={restartGame}
                        >
                            Play Again
                            <span>↻</span>
                        </button>

                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="game-page">

            <button
                className="theme-toggle"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
            >
                <span className="theme-icon">
                    {darkMode ? "☀" : "☾"}
                </span>

                <span className="theme-text">
                    {darkMode ? "LIGHT" : "DARK"}
                </span>
            </button>

            {/* HEADER */}
            <div className="game-header">
                <div>

                    <span className="game-label">
                        AWS MEMORY MATCH
                    </span>

                    <h1>
                        Match the
                        <span> services.</span>
                    </h1>

                    <p>
                        Find the matching AWS service cards and learn
                        something new along the way.
                    </p>


                </div>

                <GameStats
                    moves={moves}
                    time={`${time}s`}
                    matched={matchedPairs}
                    total={totalPairs}
                />
            </div>

            {/* LEVEL PROGRESS */}
            <div className="game-level-info">

                <div className="level-progress">

                    <div className="level-progress-top">
                        <span>
                            LEVEL {currentLevel}
                        </span>

                        <strong>
                            {matchedPairs} / {totalPairs} MATCHED
                        </strong>
                    </div>

                    <div className="progress-track">
                        <div
                            className="progress-fill"
                            style={{
                                width: `${totalPairs > 0
                                    ? (matchedPairs / totalPairs) * 100
                                    : 0
                                    }%`,
                            }}
                        />
                    </div>

                </div>

                <div className="services-count">
                    <span>ROUND</span>

                    <strong>
                        {currentLevel} / {levels.length}
                    </strong>
                </div>

            </div>

            {/* GAME AREA */}
            <div className="game-layout">

                {/* CARDS */}
                <section className="cards-section">


                    <div className="cards-grid"

                        style={{ "--grid-columns": gridColumns }}
                    >

                        {cards.map((card) => {
                            const flipped = isCardFlipped(
                                card.cardId
                            );

                            const matched = isCardMatched(
                                card.cardId
                            );

                            return (
                                <MemoryCard
                                    key={card.cardId}
                                    service={card}
                                    isFlipped={flipped}
                                    isMatched={matched}
                                    onClick={() =>
                                        handleCardClick(card)
                                    }
                                />
                            );
                        })}

                    </div>

                    {gameStarted && !gameCompleted && (
                        <p className="game-message">
                            Keep going! Find all the pairs. 💪
                        </p>
                    )}

                    {/* LEVEL COMPLETE POPUP */}
                    {gameCompleted && (
                        <div className="level-complete-overlay">

                            <div className="level-complete-modal">

                                {/* Decorative particles */}
                                <div className="celebration-particle particle-one">
                                    ✦
                                </div>

                                <div className="celebration-particle particle-two">
                                    ✧
                                </div>

                                <div className="celebration-particle particle-three">
                                    ✦
                                </div>

                                {/* Trophy */}
                                <div className="celebration-icon">
                                    🏆
                                </div>

                                <span className="modal-eyebrow">
                                    LEVEL {currentLevel} COMPLETE
                                </span>

                                <h1>
                                    Nice work!
                                </h1>

                                <p className="modal-description">
                                    You found every AWS service pair.
                                </p>

                                {/* Results */}
                                <div className="modal-stats">

                                    <div>
                                        <span>MOVES</span>
                                        <strong>
                                            {moves}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>TIME</span>
                                        <strong>
                                            {time}s
                                        </strong>
                                    </div>

                                    <div>
                                        <span>MATCHED</span>
                                        <strong>
                                            {matchedPairs}/{totalPairs}
                                        </strong>
                                    </div>

                                </div>

                                {/* Actions */}
                                <div className="modal-actions">

                                    <button
                                        className="modal-secondary-button"
                                        onClick={replayLevel}
                                    >
                                        Replay
                                    </button>

                                    {currentLevel < levels.length ? (
                                        <button
                                            className="modal-primary-button"
                                            onClick={nextLevel}
                                        >
                                            Next Level
                                            <span>→</span>
                                        </button>
                                    ) : (
                                        <button
                                            className="modal-primary-button"
                                            onClick={restartGame}
                                        >
                                            Play Again
                                            <span>↻</span>
                                        </button>
                                    )}

                                </div>

                                <div className="modal-bottom-text">
                                    {currentLevel < levels.length
                                        ? "Ready for the next challenge?"
                                        : "You've completed every level!"}
                                </div>

                            </div>
                        </div>
                    )}

                    {/* SERVICE INFORMATION */}
                </section>

                <ServiceInfoPanel
                    service={matchedService}
                />

            </div>

        </main>
    );
}

export default GameBoard;
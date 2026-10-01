import { useEffect, useState } from "react";
import { awsServices } from "../data/awsServices";
import { shuffleCards } from "../utils/shuffleCards";

const LEVELS = [
  {
    level: 1,
    serviceCount: 4,
  },
  {
    level: 2,
    serviceCount: 6,
  },
  {
    level: 3,
    serviceCount: 8,
  },
  {
    level: 4,
    serviceCount: 10,
  },
  {
    level: 5,
    serviceCount: 15,
  },
];

function createCards(services, serviceCount) {
  const selectedServices = shuffleCards(services).slice(0, serviceCount);

  const cards = selectedServices.flatMap((service) => [
    {
      cardId: `${service.id}-1`,
      serviceId: service.id,
      name: service.name,
      icon: service.icon,
      category: service.category,
    },
    {
      cardId: `${service.id}-2`,
      serviceId: service.id,
      name: service.name,
      icon: service.icon,
      category: service.category,
    },
  ]);

  return shuffleCards(cards);
}

export function useMemoryGame() {
  const [currentLevel, setCurrentLevel] = useState(1);

  const [cards, setCards] = useState([]);

  const [flippedCards, setFlippedCards] = useState([]);

  const [matchedCards, setMatchedCards] = useState([]);

  const [matchedService, setMatchedService] = useState(null);

  // Current level statistics
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  // Overall game statistics
  const [totalMoves, setTotalMoves] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [gameStarted, setGameStarted] = useState(false);

  const [gameCompleted, setGameCompleted] = useState(false);

  const [isChecking, setIsChecking] = useState(false);

  const [isAllLevelsCompleted, setIsAllLevelsCompleted] = useState(false);

  const initializeLevel = (levelNumber) => {
    const level = LEVELS.find((item) => item.level === levelNumber);

    if (!level) {
      return;
    }

    const newCards = createCards(awsServices, level.serviceCount);

    setCards(newCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMatchedService(null);

    // Reset only current-level statistics
    setMoves(0);
    setTime(0);

    setGameStarted(false);
    setGameCompleted(false);
    setIsChecking(false);
  };

  useEffect(() => {
    initializeLevel(currentLevel);
  }, [currentLevel]);

  // Current-level timer + total game timer
  useEffect(() => {
    if (!gameStarted || gameCompleted || isAllLevelsCompleted) {
      return;
    }

    const timer = setInterval(() => {
      setTime((previousTime) => previousTime + 1);

      setTotalTime((previousTotalTime) => previousTotalTime + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [gameStarted, gameCompleted, isAllLevelsCompleted]);

  const handleCardClick = (card) => {
    if (isChecking) {
      return;
    }

    if (matchedCards.includes(card.cardId)) {
      return;
    }

    if (
      flippedCards.some(
        (flippedCard) => flippedCard.cardId === card.cardId
      )
    ) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (flippedCards.length === 0) {
      setFlippedCards([card]);
      return;
    }

    if (flippedCards.length === 1) {
      const firstCard = flippedCards[0];

      setFlippedCards([firstCard, card]);

      // Current level moves
      setMoves((previousMoves) => previousMoves + 1);

      // Overall game moves
      setTotalMoves((previousTotalMoves) => previousTotalMoves + 1);

      setIsChecking(true);

      if (firstCard.serviceId === card.serviceId) {
        setMatchedCards((previousMatchedCards) => [
          ...previousMatchedCards,
          firstCard.cardId,
          card.cardId,
        ]);

        setMatchedService(
          awsServices.find(
            (service) => service.id === firstCard.serviceId
          ) || null
        );

        setFlippedCards([]);

        setIsChecking(false);

        const totalCards =
          LEVELS.find(
            (item) => item.level === currentLevel
          ).serviceCount * 2;

        const newMatchedCount = matchedCards.length + 2;

        if (newMatchedCount === totalCards) {
          setGameCompleted(true);
        }
      } else {
        setTimeout(() => {
          setFlippedCards([]);
          setIsChecking(false);
        }, 900);
      }
    }
  };

  const nextLevel = () => {
    if (!gameCompleted) {
      return;
    }

    if (currentLevel === LEVELS.length) {
      setIsAllLevelsCompleted(true);
      return;
    }

    setCurrentLevel(
      (previousLevel) => previousLevel + 1
    );
  };

  const replayLevel = () => {
    initializeLevel(currentLevel);
  };

  const restartGame = () => {
    setCurrentLevel(1);

    setIsAllLevelsCompleted(false);

    // Reset overall game statistics
    setTotalMoves(0);
    setTotalTime(0);

    initializeLevel(1);
  };

  const isCardFlipped = (cardId) => {
    return (
      flippedCards.some(
        (card) => card.cardId === cardId
      ) ||
      matchedCards.includes(cardId)
    );
  };

  const isCardMatched = (cardId) => {
    return matchedCards.includes(cardId);
  };

  // Number of pairs matched in current level
  const matchedPairs = matchedCards.length / 2;

  // Total pairs required for current level
  const totalPairs =
    LEVELS.find(
      (item) => item.level === currentLevel
    )?.serviceCount || 0;

  return {
    levels: LEVELS,

    currentLevel,

    cards,

    flippedCards,

    matchedCards,

    matchedService,

    // Current level statistics
    moves,
    time,

    // Overall game statistics
    totalMoves,
    totalTime,

    // Level progress
    matchedPairs,
    totalPairs,

    gameStarted,

    gameCompleted,

    isChecking,

    isAllLevelsCompleted,

    handleCardClick,

    isCardFlipped,

    isCardMatched,

    nextLevel,

    replayLevel,

    restartGame,
  };
}

export default useMemoryGame;
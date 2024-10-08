import React, { useState } from 'react';
import './CardGame.css';

const cardValueMap = {
  "ACE": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  "JACK": 11,
  "QUEEN": 12,
  "KING": 13
};

const CardGame = () => {
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [message, setMessage] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [messageClass, setMessageClass] = useState(""); 
  const [card1Flipped, setCard1Flipped] = useState(false); 
  const [card2Flipped, setCard2Flipped] = useState(false); 
  const [newCardsFlipped, setNewCardsFlipped] = useState(false); 
  const [guessMade, setGuessMade] = useState(false); 

  const generateCards = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=2');
      const data = await response.json();

      const card1 = {
        value: data.cards[0].value,
        suit: data.cards[0].suit,
        image: data.cards[0].image,
        numericValue: cardValueMap[data.cards[0].value]
      };
      const card2 = {
        value: data.cards[1].value,
        suit: data.cards[1].suit,
        image: data.cards[1].image,
        numericValue: cardValueMap[data.cards[1].value]
      };

      setFirstCard(card1);
      setSecondCard(card2);
      setMessage("");
      setRevealed(false);
      setMessageClass(""); 
      setCard1Flipped(true); 
      setCard2Flipped(false); 
      setNewCardsFlipped(true); 
      setGuessMade(false); 

      setTimeout(() => {
        setNewCardsFlipped(false); 
        setCard1Flipped(false); 
      }, 600);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  
  const checkGuess = (guess) => {
    setRevealed(true);
    setCard2Flipped(true); 
    setGuessMade(true); 

    if (secondCard) {
      if (secondCard.numericValue === firstCard.numericValue) {
        setMessage("As cartas são iguais!");
        setMessageClass("equal-message"); 
      } else {
        const isCorrect =
          (guess === "higher" && firstCard.numericValue > secondCard.numericValue) ||
          (guess === "lower" && firstCard.numericValue < secondCard.numericValue);

        if (isCorrect) {
          setScore(score + 1);
          setMessage("Você acertou!");
          setMessageClass("win-message"); 
          if (score + 1 >= 4) {
            setMessage("Você ganhou!");
            setMessageClass("final-win-message"); // Classe de animação para ganhar
            setGameOver(true);
          }
        } else {
          setLives(lives - 1);
          setMessage("Você errou!");
          setMessageClass("lose-message"); 
          if (lives - 1 <= 0) {
            setMessage("Você perdeu! Tente novamente.");
            setMessageClass("final-lose-message"); // Classe de animação para perder
            setGameOver(true);
          }
        }
      }

      setTimeout(() => {
        setCard2Flipped(false);
      }, 600);
    }
  };

  return (
    <div className="card-game">
      <h2 className='pontos'>Pontuação: {score}</h2>
      <h2 className='vidas'>Vidas: {lives}</h2>

      {gameOver ? (
        <div className={`game-over-message ${messageClass}`}>
          {message}
          <button onClick={() => window.location.reload()} className='carousel-button'>Reiniciar Jogo</button>
        </div>
      ) : (
        <>
          <div className="card-wrapper">
            <div className="card-display">
              {firstCard && (
                <div className="card">
                  <img
                    src={firstCard.image}
                    alt={`${firstCard.value} of ${firstCard.suit}`}
                    className={card1Flipped ? 'flip' : ''}
                  />
                  <div className="card-text">{`${firstCard.value} of ${firstCard.suit}`}</div>
                </div>
              )}
            </div>

            <div className="card-display">
              {revealed && secondCard && (
                <div className="card">
                  <img
                    src={secondCard.image}
                    alt={`${secondCard.value} of ${secondCard.suit}`}
                    className={card2Flipped ? 'flip' : ''}
                  />
                  <div className="card-text">{`${secondCard.value} of ${secondCard.suit}`}</div>
                </div>
              )}
            </div>
          </div>

          <div className='pergunta'>
            {firstCard && !guessMade ? 'Sua Carta é MAIOR ou MENOR que a próxima?' : ''}
          </div>

          <div className="button-container">
            {!revealed && firstCard && (
              <>
                <button className="carousel-button" onClick={() => checkGuess("lower")}>
                   Menor
                </button>
                <button className="carousel-button" onClick={() => checkGuess("higher")}>
                   Maior
                </button>
              </>
            )}
          </div>

          {revealed && (
            <p className={messageClass}>
              {message.includes("cartas iguais") ? message : message}
            </p>
          )}

          <button 
            className={`carousel-button ${newCardsFlipped ? 'flip' : ''}`} 
            onClick={generateCards}
          >
            Gerar Novas Cartas
          </button>
        </>
      )}
    </div>
  );
};

export default CardGame;

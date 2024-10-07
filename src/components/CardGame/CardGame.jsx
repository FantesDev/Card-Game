// src/components/CardGame/CardGame.jsx
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
  const [firstCard, setFirstCard] = useState(null); // Primeira carta visível
  const [secondCard, setSecondCard] = useState(null); // Segunda carta oculta
  const [score, setScore] = useState(0); // Pontuação
  const [message, setMessage] = useState(""); // Mensagem de acerto/erro
  const [revealed, setRevealed] = useState(false); // Indica se a segunda carta foi revelada

  // Função para gerar a primeira e segunda carta
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
      setRevealed(false); // Reseta o estado da revelação
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  // Função para verificar se o palpite foi correto
  const checkGuess = (guess) => {
    setRevealed(true);
    if (secondCard) {
      const isCorrect =
        (guess === "higher" && secondCard.numericValue > firstCard.numericValue) ||
        (guess === "lower" && secondCard.numericValue < firstCard.numericValue);

      if (isCorrect) {
        setScore(score + 1);
        setMessage("Você acertou!");
      } else {
        setScore(score - 1);
        setMessage("Você errou!");
      }
    }
  };

  return (
    <div className="card-game">
      <h2>Pontuação: {score}</h2>

      <div className="card-display">
        {firstCard && (
          <div className="card">
            <img src={firstCard.image} alt={`${firstCard.value} of ${firstCard.suit}`} />
            <div className="card-text">{`${firstCard.value} of ${firstCard.suit}`}</div>
          </div>
        )}
      </div>

      <div className="button-container">
        {!revealed && firstCard && (
          <>
            <button className="carousel-button" onClick={() => checkGuess("higher")}>
              Adivinhar Maior
            </button>
            <button className="carousel-button" onClick={() => checkGuess("lower")}>
              Adivinhar Menor
            </button>
          </>
        )}
      </div>

      {revealed && secondCard && (
        <div className="card-display">
          <div className="card">
            <img src={secondCard.image} alt={`${secondCard.value} of ${secondCard.suit}`} />
            <div className="card-text">{`${secondCard.value} of ${secondCard.suit}`}</div>
          </div>
          <p>{message}</p>
        </div>
      )}

      <button className="carousel-button" onClick={generateCards}>
        Gerar Novas Cartas
      </button>
    </div>
  );
};

export default CardGame;

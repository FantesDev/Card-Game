// src/components/CardGame/CardGame.jsx
import React, { useState, useEffect } from 'react';
import './CardGame.css';

const CardGame = () => {
  const [cards, setCards] = useState([]); // Estado para as cartas
  const [currentIndex, setCurrentIndex] = useState(0); // Índice da carta atual

  // Função para gerar uma nova carta usando a API
  const generateCard = async () => {
    try {
      const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1');
      const data = await response.json();
      const newCard = {
        id: cards.length + 1,
        image: data.cards[0].image,
        text: `${data.cards[0].value} of ${data.cards[0].suit}`,
      };
      setCards([...cards, newCard]);
      setCurrentIndex(cards.length); // Define o índice atual para a nova carta
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  // Função para ir para a próxima carta
  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Função para ir para a carta anterior
  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="card-game">
      <div className="card-display">
        {cards.length > 0 && (
          <div className="card">
            <img src={cards[currentIndex].image} alt={cards[currentIndex].text} />
            <div className="card-text">{cards[currentIndex].text}</div>
          </div>
        )}
      </div>
      <div className="button-container">
        <button className="carousel-button" onClick={prevCard} disabled={currentIndex === 0}>
          Prev
        </button>
        <button className="carousel-button" onClick={nextCard} disabled={currentIndex === cards.length - 1 || cards.length === 0}>
          Next
        </button>
      </div>
      <button className="carousel-button" onClick={generateCard}>Generate Card</button>
    </div>
  );
};

export default CardGame;

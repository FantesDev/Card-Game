// src/components/CardGame/CardGame.jsx
import React, { useState } from 'react';
import './CardDisplay.css';

const CardGame = () => {
  const [cards, setCards] = useState([
    { id: 1, text: "Card 1" },
    { id: 2, text: "Card 2" },
    { id: 3, text: "Card 3" },
    { id: 4, text: "Card 4" },
    { id: 5, text: "Card 5" },
  ]);

  return (
    <div className="card-game">
      <div className="card-display">
        {cards.map(card => (
          <div key={card.id} className="card">
            {card.text}
          </div>
        ))}
      </div>
      <button className="carousel-button">Next</button>
    </div>
  );
};

export default CardGame;

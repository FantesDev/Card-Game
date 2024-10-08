import React, { useEffect, useState } from 'react';
import './CardDisplay.css';

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

const CardDisplay = () => {
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=52');
        const data = await response.json();
        setCards(data.cards);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []);

  // Agrupando cartas por naipe e ordenando-as em ordem crescente
  const groupCardsBySuit = (cards) => {
    return cards.reduce((acc, card) => {
      acc[card.suit] = acc[card.suit] || [];
      acc[card.suit].push(card);
      return acc;
    }, {});
  };

  // Ordena as cartas em ordem crescente pelo valor
  const sortCards = (cards) => {
    return cards.sort((a, b) => cardValueMap[a.value] - cardValueMap[b.value]);
  };

  const groupedCards = groupCardsBySuit(cards);
  const suits = Object.keys(groupedCards);

  // Cria uma lista de grupos de 3 cartas
  const cardGroups = suits.flatMap(suit => {
    const suitCards = sortCards(groupedCards[suit]); 
    const groups = [];
    for (let i = 0; i < suitCards.length; i += 3) { 
      groups.push(suitCards.slice(i, i + 3));
    }
    return groups.map(group => ({ suit, cards: group }));
  });

  const totalGroups = cardGroups.length;

  const nextGroup = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalGroups);
  };

  const prevGroup = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalGroups) % totalGroups);
  };

  return (
    <div className="card-display">
      <div className='regras_text'>
        <h2 className='title_regras'>Regras do Jogo</h2>
        <ul className='conjunto_regras'>
          <li>O objetivo do jogo é adivinhar a carta correta.</li>
          <li>Você precisa advinhar se <strong>SUA CARTA É MAIOR OU MENOR QUE A PRÓXIMA CARTA</strong>.</li>
          <li>Você começa com 3 vidas.</li>
          <li>Ao errar uma carta, você perde uma vida.</li>
          <li>Ao acertar 4 cartas, você vence o jogo!</li>
        </ul>
      </div>
      {cards.length > 0 && (
        <div className="card-wrapper">
          <h3>{`${cardGroups[currentIndex].suit}`}</h3>
          <div className="card-group">
            {cardGroups[currentIndex].cards.map((card, index) => (
              <div key={index} className="single-card">
                <img src={card.image} alt={`${card.value} of ${card.suit}`} />
                <p className='nome_carta'>{`${card.value} of ${card.suit}`}</p>
                <p className='valor_carta'>Valor: {cardValueMap[card.value]}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="button-container">
        <button className="carousel-button" onClick={prevGroup}>Anterior</button>
        <button className="carousel-button" onClick={nextGroup}>Próximo</button>
      </div>
    </div>
  );
};

export default CardDisplay;

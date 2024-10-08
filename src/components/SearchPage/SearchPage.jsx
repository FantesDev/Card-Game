import React, { useState, useEffect } from "react";
import "./SearchPage.css";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allCards, setAllCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);

  const fetchCards = async () => {
    try {
      const response = await fetch("https://deckofcardsapi.com/api/deck/new/draw/?count=52");
      const data = await response.json();
      setAllCards(data.cards);
    } catch (error) {
      console.error("Error fetching cards:", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const cards = allCards.filter((card) =>
        card.value.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.suit.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCards(cards);
    } else {
      setFilteredCards([]);
    }
  }, [searchTerm, allCards]);

  return (
    <div className="search-page">
      <h1 className="search-title">Pesquisa de Cartas</h1>
      <input
        type="text"
        className="search-input"
        placeholder="Procure uma carta..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredCards.length > 0 && (
        <div className="card-container">
          {filteredCards.map((card) => (
            <div key={card.code} className="search-card">
              <img src={card.image} alt={`${card.value} de ${card.suit}`} className="card-image" />
              <p className="card-name">{`${card.value} de ${card.suit}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;

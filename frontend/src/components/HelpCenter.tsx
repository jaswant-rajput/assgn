import { useState, useEffect } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Card from './Card';
import Footer from './Footer';
import Modal from './Modal'; // This Modal is for creating a new card
import CardDetailModal from './CardDetailModal'; // This is the new modal for viewing card details
import { Card as CardObject } from '../types/types';

const HelpCenter = () => {
  const [cards, setCards] = useState<CardObject[]>([]);
  const [filteredCards, setFilteredCards] = useState<CardObject[]>([]);
  const [selectedCard, setSelectedCard] = useState<CardObject | null>(null);
  const [isCardDetailModalOpen, setIsCardDetailModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('http://localhost:3000/cards');
        const data = await response.json();
        setCards(data.data);
        setFilteredCards(data.data);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const filtered = cards.filter(card => 
      card.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCards(filtered);
  }, [searchQuery, cards]);

  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCardClick = async (title: string) => {
    try {
      const response = await fetch(`http://localhost:3000/cards/${title}`);
      const data = await response.json();
      setSelectedCard(data.data[0]);
      setIsCardDetailModalOpen(true);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const handleCloseCardDetailModal = () => {
    setIsCardDetailModalOpen(false);
    setSelectedCard(null);
  };

  const handleSubmitRequest = async (data: CardObject) => {
    try {
      const response = await fetch('http://localhost:3000/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (result.success) {
        alert('Card created successfully');
        setIsCreateModalOpen(false);
        setCards([...cards, result.card]); // Update the cards list with the new card
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Error submitting request');
      console.error(error);
    }
  };

  const cardsElements = filteredCards.length > 0 ? filteredCards.map((card, index) => (
    <div key={index} onClick={() => handleCardClick(card.title)}>
      <Card title={card.title} description={card.description} />
    </div>
  )) : <p>No cards found</p>;

  return (
    <div className="help-center">
      <Header onOpenModal={handleOpenCreateModal} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="cards">
        {cardsElements}
      </div>
      <Footer />
      {/* Modal for creating new cards */}
      <Modal isOpen={isCreateModalOpen} onClose={handleCloseCreateModal} onSubmit={handleSubmitRequest} />
      {/* Modal for viewing card details */}
      <CardDetailModal isOpen={isCardDetailModalOpen} onClose={handleCloseCardDetailModal} card={selectedCard} />
    </div>
  );
};

export default HelpCenter;

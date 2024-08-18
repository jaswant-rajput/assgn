const CardDetailModal = ({ isOpen, onClose, card }:any) => {
  if (!isOpen || !card) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{card.title}</h2>
        <p>{card.description}</p>
        <div className="modal-actions">
          <button type="button" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default CardDetailModal;

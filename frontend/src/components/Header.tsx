const Header = ({ onOpenModal }:any) => {
  return (
    <header className="header">
      <div className="header-left">
        <h1>Abstract | Help Center</h1>
      </div>
      <button className="submit-button" onClick={onOpenModal}>Submit a request</button>
    </header>
  );
};

export default Header;

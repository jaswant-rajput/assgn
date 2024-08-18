const SearchBar = ({ searchQuery, setSearchQuery }:any) => {
  return (
    <div className="search-bar">
      <h2>How can we help?</h2>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;

const Search = ({ query, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search..."
      value={query}
      onChange={(e) => onSearchChange(e.target.value)}
      className="p-2 bg-blocks-color"
    />
  );
};

export default Search;

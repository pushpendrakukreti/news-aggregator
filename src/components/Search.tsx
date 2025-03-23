import { useState, useEffect } from "react";

interface SearchProps {
  onSearch: (query: string) => void;
  resetSignal: boolean;
}

const Search = ({ onSearch, resetSignal }: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (resetSignal) {
      setSearchTerm("");
    }
  }, [resetSignal]);

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search news..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;

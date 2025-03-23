import { useState } from "react";

interface FiltersProps {
  categories: string[];
  onFilterChange: (filters: { date?: string; category?: string; source?: string }) => void;
  onReset: () => void;
}

const Filters = ({ categories, onFilterChange, onReset }: FiltersProps) => {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");

  const handleApplyFilters = () => {
    onFilterChange({ date, category, source });
  };

  const handleReset = () => {
    setDate("");
    setCategory("");
    setSource("");
    onReset();
  };

  return (
    <div className="filters-container">
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">All Categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="">All Sources</option>
        <option value="NewsAPI">NewsAPI</option>
        <option value="The Guardian">The Guardian</option>
        <option value="NYTimes">NYTimes</option>
      </select>
      <button onClick={handleApplyFilters}>Apply Filters</button>
      <button onClick={handleReset} className="reset-btn">Reset</button>
    </div>
  );
};

export default Filters;

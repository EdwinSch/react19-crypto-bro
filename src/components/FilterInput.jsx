const FilterInput = ({ filter, onFilterChange }) => {
  return (
    <input
      type="text"
      id="filter"
      value={filter}
      onChange={(e) => onFilterChange(e.target.value)}
      placeholder="Search coins by name or symbol"
    />
  );
};
export default FilterInput;

import CoinCard from "../components/coinCard";
import LimitSelector from "../components/LimitSelector";
import FilterInput from "../components/FilterInput";

const HomePage = ({
  coins,
  loading,
  error,
  limit,
  setLimit,
  filter,
  setFilter,
}) => {
  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <div className="controls">
        <FilterInput filter={filter} onFilterChange={setFilter} />
        <LimitSelector limit={limit} onLimitChange={setLimit} />
      </div>

      <main>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <section className="cards-container">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin, idx) => {
                return <CoinCard coin={coin} key={coin.id} idx={idx} />;
              })
            ) : (
              <p className="error">No matches for your search</p>
            )}
          </section>
        )}
      </main>
    </>
  );
};
export default HomePage;

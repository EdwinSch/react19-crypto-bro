import { useState, useEffect } from "react";
import CoinCard from "./components/coinCard";
import LimitSelector from "./components/LimitSelector";
import FilterInput from "./components/FilterInput";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [limit, setLimit] = useState(10);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await fetch(
          `${API_URL}&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false`
        );

        if (!response.ok) {
          throw new Error("failed to fetch data");
        }

        const data = await response.json();
        console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  const filteredCoins = coins.filter((coin) => {
    return (
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
    );
  });

  return (
    <>
      <header>
        <h1>🚀 Crypto Bro</h1>
      </header>

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
}

export default App;

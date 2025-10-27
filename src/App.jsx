import { useState, useEffect } from "react";
import HomePage from "./pages/home";
import AboutPage from "./pages/about";
import { Routes, Route } from "react-router";
import Header from "./components/Header";
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
        // console.log(data);
        setCoins(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCoins();
  }, [limit]);

  return (
    <>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              coins={coins}
              filter={filter}
              setFilter={setFilter}
              limit={limit}
              setLimit={setLimit}
              loading={loading}
              error={error}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </>
  );
}

export default App;

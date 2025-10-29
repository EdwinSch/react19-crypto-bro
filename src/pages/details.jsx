import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import Spinner from "../components/Spinner";
const API_URL = import.meta.env.VITE_COIN_API_URL;
import CoinChart from "../components/CoinChart";

const CoinDetailsPage = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setCoin(data);
        // console.log(data);
      } catch (error) {
        setError(error.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return (
    <main>
      <div className="coin-details-container">
        <Link to={"/"}>&lsaquo; Back to home</Link>

        <h1 className="detail-heading">
          {coin ? `${coin.name} (${coin.symbol})` : "Coin Details"}
        </h1>

        {loading && <Spinner />}
        {error && <p className="error">{error}</p>}

        {!loading && !error && (
          <>
            <img src={coin.image.small} alt={coin.name} />
            <p className="coin-description">
              {coin.description.en.split(". ")[0] + "."}
            </p>

            <div className="details-info-container">
              <p>Current Rank: #{coin.market_cap_rank}</p>
              <p>
                Current Price: ${" "}
                {coin.market_data.current_price.usd.toLocaleString()}
              </p>
              <p>
                Market Cap: $ {coin.market_data.market_cap.usd.toLocaleString()}
              </p>
              <p className="regular">
                Total Supply:{" "}
                {coin.market_data.total_supply?.toLocaleString() || "N/A"}
              </p>
              <p className="regular">
                Last Updated: {new Date(coin.last_updated).toLocaleDateString()}
              </p>

              <a
                style={{ display: "block", marginTop: 10, marginBottom: 30 }}
                href={coin.links.homepage}
                target="_blank"
                rel="noopener noreferrer"
              >
                Go to website
              </a>
            </div>

            <CoinChart coinId={coin.id} />
          </>
        )}
      </div>
    </main>
  );
};
export default CoinDetailsPage;

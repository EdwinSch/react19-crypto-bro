const CoinCard = ({ coin }) => {
  return (
    <article className="coin-card">
      <div className="card-header">
        <img src={coin.image} alt={coin.name} />
        <div>
          <h2>{coin.name}</h2>
          <h3>{coin.symbol.toUpperCase()}</h3>
        </div>
      </div>

      <div className="card-body">
        <p>Price: ${coin.current_price.toLocaleString()}</p>
        <p
          style={{
            color: coin.market_cap_change_percentage_24h >= 0 ? "green" : "red",
          }}
        >
          {coin.market_cap_change_percentage_24h.toFixed(2)} %
        </p>
        <p>Market Cap: {coin.market_cap.toLocaleString()}</p>
      </div>
    </article>
  );
};
export default CoinCard;

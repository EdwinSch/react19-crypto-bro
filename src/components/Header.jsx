import { Link } from "react-router";

const Header = () => {
  return (
    <header>
      <h1>🚀 Crypto Bro</h1>
      <div className="pagelinks">
        <Link to={"/"}>Homepage</Link>
        <Link to={"/about"}>About</Link>
      </div>
    </header>
  );
};
export default Header;

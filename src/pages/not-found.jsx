import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <p className="error">404 - page not found</p>
      <Link to={"/"}>&lsaquo; Back to homepage</Link>
    </div>
  );
};
export default NotFoundPage;

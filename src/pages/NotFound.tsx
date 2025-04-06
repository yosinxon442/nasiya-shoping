import { Link } from "react-router-dom";
import "../styles/components/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <p className="notfound-message">Oops! Page not found.</p>
      <Link to="/" className="notfound-link">
        Go to Home
      </Link>
    </div>
  );
}

export default NotFound;

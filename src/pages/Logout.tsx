import { Link } from "react-router-dom";

const Logout = () => (
  <div style={{ padding: 32 }}>
    <h2>Logout Page</h2>
    <p>You have been logged out.</p>
    <Link to="/">Back</Link>
  </div>
);

export default Logout;

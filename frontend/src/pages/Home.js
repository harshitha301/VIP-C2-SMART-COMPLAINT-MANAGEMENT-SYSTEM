import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">
        Complaint Management System
      </h1>

      <p className="lead">
        Register complaints and track their status
      </p>

      <div className="mt-4">
        <Link
          to="/login"
          className="btn btn-primary me-3"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="btn btn-success"
        >
          Register
        </Link>
      </div>
    </div>
  );
}

export default Home;
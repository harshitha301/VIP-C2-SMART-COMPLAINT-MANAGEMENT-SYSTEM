import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/login",
      {
        email,
        password,
      }
    );

    console.log("LOGIN RESPONSE =", res.data);

    alert("Login Success");
window.TOKEN = res.data.token;
window.ROLE = res.data.role;
    // TEMPORARY
console.log("TOKEN =", res.data.token);


const role = res.data.role;

if (role === "ADMIN") {
  navigate("/admin");
} else {
  navigate("/user");
}
  } catch (error) {
    console.log("LOGIN ERROR =", error);
    console.log(
      "ERROR RESPONSE =",
      error.response?.data
    );

    alert("Login Failed");
  }
};

  return (
    <div
      className="container"
      style={{ marginTop: "100px" }}
    >
      <div
        className="card p-4"
        style={{
          maxWidth: "400px",
          margin: "auto",
        }}
      >
        <h2 className="text-center mb-4">
          Login
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="btn btn-primary mb-2"
          onClick={handleLogin}
        >
          Login
        </button>

        <Link
          to="/register"
          className="btn btn-success mb-2"
        >
          Register
        </Link>

        <Link
          to="/"
          className="btn btn-secondary"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Login;
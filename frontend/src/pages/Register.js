import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          name,
          email,
          password,
        }
      );

      alert("Registration Successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration Failed");
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
          maxWidth: "450px",
          margin: "auto",
        }}
      >
        <h2 className="text-center mb-4">
          Register
        </h2>

        <input
          className="form-control mb-3"
          placeholder="Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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
          className="btn btn-success"
          onClick={handleRegister}
        >
          Register
        </button>

        <p className="mt-3 text-center">
          Already have an account?
        </p>

        <Link
          to="/"
          className="btn btn-primary"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Register;
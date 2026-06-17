import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function UserDashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");

  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const token = window.TOKEN;
console.log("TOKEN =", token);
const logout = () => {
  window.TOKEN = null;
  window.ROLE = null;

  window.location.assign("/");
};

  const loadComplaints = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  const createComplaint = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/complaints",
        {
  title,
  description,
  category,
  priority,
},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Complaint Created Successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setPriority("Medium");

      loadComplaints();
    } catch (error) {
      console.log(error);
      alert("Failed to Create Complaint");
    }
  };

  const submitFeedback = async (complaintId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/feedback",
        {
          complaint: complaintId,
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Feedback Submitted");

      setRating("");
      setComment("");
    } catch (error) {
      console.log(error);
      alert("Feedback Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <h1>User Dashboard</h1>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        <div className="row mb-3">
  <div className="col-md-4">
    <div className="alert alert-primary">
      Total Complaints: {complaints.length}
    </div>
  </div>

  <div className="col-md-4">
    <div className="alert alert-warning">
      Pending: {
        complaints.filter(
          (c) => c.status !== "Resolved"
        ).length
      }
    </div>
  </div>

  <div className="col-md-4">
    <div className="alert alert-success">
      Resolved: {
        complaints.filter(
          (c) => c.status === "Resolved"
        ).length
      }
    </div>
  </div>
</div>

        <div className="card p-4 mb-4">
          <h3>Create Complaint</h3>

          <input
            className="form-control mb-3"
            value={title}
            placeholder="Complaint Title"
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

          <input
            className="form-control mb-3"
            value={description}
            placeholder="Complaint Description"
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />
          <select
  className="form-select"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select Category</option>
  <option value="Electricity">Electricity</option>
  <option value="Water">Water</option>
  <option value="Network">Network</option>
  <option value="Cleanliness">Cleanliness</option>
</select>

          <select
            className="form-select mb-3"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value)
            }
          >
            <option value="Low">
              Low Priority
            </option>

            <option value="Medium">
              Medium Priority
            </option>

            <option value="High">
              High Priority
            </option>
          </select>

          <button
            className="btn btn-primary"
            onClick={createComplaint}
          >
            Submit Complaint
          </button>
        </div>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <h3 className="mb-3">
          My Complaints
        </h3>

        <div className="row">
          {complaints
            .filter((c) =>
              c.title
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((c) => (
              <div
                className="col-md-6"
                key={c._id}
              >
                <div className="card mb-3 shadow-sm">
                  <div className="card-body">
                    <h5>{c.title}</h5>

                    <p>{c.description}</p>

                    <p>
                      <strong>Category:</strong>{" "}
                      {c.category}
                    </p>
                    <p>
                      <strong>Priority:</strong>{" "}
                      <span
                        className={
                          c.priority === "High"
                            ? "badge bg-danger"
                            : c.priority ===
                              "Medium"
                            ? "badge bg-warning text-dark"
                            : "badge bg-success"
                        }
                      >
                        {c.priority}
                      </span>
                    </p>

                    <p>
  <strong>Status:</strong>{" "}
  <span
    className={
      c.status === "Resolved"
        ? "badge bg-success"
        : "badge bg-warning text-dark"
    }
  >
    {c.status}
  </span>
</p>
<p>
  <strong>Date:</strong>{" "}
  {new Date(
    c.createdAt
  ).toLocaleDateString()}
</p>

                    {c.status ===
                      "Resolved" && (
                      <>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          className="form-control mb-2"
                          placeholder="Rating (1-5)"
                          value={rating}
                          onChange={(e) =>
                            setRating(
                              e.target.value
                            )
                          }
                        />

                        <input
                          className="form-control mb-2"
                          placeholder="Comment"
                          value={comment}
                          onChange={(e) =>
                            setComment(
                              e.target.value
                            )
                          }
                        />

                        <button
                          className="btn btn-success"
                          onClick={() =>
                            submitFeedback(
                              c._id
                            )
                          }
                        >
                          Submit Feedback
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
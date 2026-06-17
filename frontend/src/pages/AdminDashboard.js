import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import AnalyticsChart from "../components/AnalyticsChart";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [analytics, setAnalytics] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
  useState("All");
  const [categoryFilter, setCategoryFilter] =
  useState("All");
  
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
        "http://localhost:5000/api/admin/complaints",
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

  const loadAnalytics = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/analytics",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalytics(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load analytics");
    }
  };

  const loadFeedbacks = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/feedback",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setFeedbacks(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load feedbacks");
    }
  };

  useEffect(() => {
    loadComplaints();
    loadAnalytics();
    loadFeedbacks();
  }, []);

    const updateStatus = async (id, status) => {
  try {
    const res = await axios.put(
      `http://localhost:5000/api/admin/complaints/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("SUCCESS:", res.data);

    alert("Status Updated");

    loadComplaints();
    loadAnalytics();
  } catch (error) {
    console.log("FULL ERROR:", error);

    if (error.response) {
      console.log("SERVER RESPONSE:", error.response.data);
      alert(error.response.data.message);
    } else {
      alert("Failed to update status");
    }
  }
};
  const deleteComplaint = async (id) => {
    if (!window.confirm("Are you sure you want to delete this complaint?"))
  return;
  try {
    await axios.delete(
      `http://localhost:5000/api/admin/complaints/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Complaint Deleted");

    loadComplaints();
    loadAnalytics();
  } catch (error) {
    console.log(error);
    alert("Failed to delete complaint");
  }
};
const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(
    "Complaint Management System Report",
    14,
    20
  );

  const tableColumn = [
    "Title",
    "Category",
    "Priority",
    "Status",
  ];

  const tableRows = complaints.map((c) => [
    c.title,
    c.category,
    c.priority,
    c.status,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("complaints-report.pdf");
};
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
  <h1>Admin Dashboard</h1>

  <div>
    
  <div>
  <button
    className="btn btn-primary me-2"
    onClick={exportPDF}
  >
    Download PDF
  </button>

  <button
    className="btn btn-danger"
    onClick={logout}
  >
    Logout
  </button>
</div>
</div>
</div>

        {/* Analytics */}
        <div className="row mb-4">
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h6>Total Users</h6>
                <h2>{analytics.totalUsers || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h6>Total Complaints</h6>
                <h2>{analytics.totalComplaints || 0}</h2>
              </div>
            </div>
          </div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h6>Resolved</h6>
                <h2>{analytics.resolvedComplaints || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-md-3 mb-3">
  <div className="card text-center shadow">
    <div className="card-body">
      <h6>Pending</h6>
      <h2>{analytics.pendingComplaints || 0}</h2>
    </div>
  </div>
</div>

          <div className="col-md-3 mb-3">
            <div className="card text-center shadow">
              <div className="card-body">
                <h6>Feedbacks</h6>
                <h2>{analytics.totalFeedbacks || 0}</h2>
              </div>
            </div>
          </div>
                  <div className="col-md-3 mb-3">
  <div className="card text-center shadow">
    <div className="card-body">
      <h6>High Priority</h6>
      <h2>{analytics.highPriority || 0}</h2>
    </div>
  </div>
</div>

<div className="col-md-3 mb-3">
  <div className="card text-center shadow">
    <div className="card-body">
      <h6>Medium Priority</h6>
      <h2>{analytics.mediumPriority || 0}</h2>
    </div>
  </div>
</div>

<div className="col-md-3 mb-3">
  <div className="card text-center shadow">
    <div className="card-body">
      <h6>Low Priority</h6>
      <h2>{analytics.lowPriority || 0}</h2>
    </div>
  </div>
</div>

        </div>
<AnalyticsChart analytics={analytics} />
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search Complaint..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
<select
  className="form-select mb-3"
  value={categoryFilter}
  onChange={(e) =>
    setCategoryFilter(e.target.value)
  }
>
  <option value="All">
    All Categories
  </option>

  <option value="Electricity">
    Electricity
  </option>

  <option value="Water">
    Water
  </option>

  <option value="Network">
    Network
  </option>

  <option value="Cleanliness">
    Cleanliness
  </option>
</select>

<h3 className="mb-3">
  All Complaints
</h3>
        
        <div className="row">
          {complaints.length === 0 ? (
            <p>No Complaints Found</p>
          ) : (
            complaints
  .filter((c) =>
    c.title
      .toLowerCase()
      .includes(
        search.toLowerCase()
      )
  )
  .filter((c) => {
    if (statusFilter === "All")
      return true;

    if (statusFilter === "Pending")
      return c.status !== "Resolved";

    return c.status === "Resolved";
  })
  .filter((c) => {
    if (categoryFilter === "All")
      return true;

    return c.category === categoryFilter;
  })
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
                        <strong>User:</strong>{" "}
                        {c.user?.name}
                      </p>

                      <p>
                        <strong>Email:</strong>{" "}
                        {c.user?.email}
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
  <strong>Created:</strong>{" "}
  {new Date(c.createdAt).toLocaleString()}
</p>

                      <p>
                        <strong>Status:</strong>{" "}
                        <span
                          className={
                            c.status ===
                            "Resolved"
                              ? "badge bg-success"
                              : "badge bg-warning text-dark"
                          }
                        >
                          {c.status}
                        </span>
                      </p>

                      <div className="d-flex gap-2">
 <select
  className="form-select"
  value={c.status}
  onChange={(e) =>
    updateStatus(
      c._id,
      e.target.value
    )
  }
>
  <option value="Pending">
    Pending
  </option>

  <option value="In Progress">
    In Progress
  </option>

  <option value="Resolved">
    Resolved
  </option>
</select>
  <button
    className="btn btn-danger"
    onClick={() =>
      deleteComplaint(c._id)
    }
  >
    Delete
  </button>
</div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>

        <hr />

        <h3>User Feedbacks</h3>

        {feedbacks.length === 0 ? (
          <p>No Feedback Found</p>
        ) : (
          feedbacks.map((f) => (
            <div
              key={f._id}
              className="card mb-3"
            >
              <div className="card-body">
                <h5>{f.user?.name}</h5>

                <p>
                  <strong>Email:</strong>{" "}
                  {f.user?.email}
                </p>

                <p>
                  <strong>Complaint:</strong>{" "}
                  {f.complaint?.title}
                </p>

                <p>
                  <strong>Rating:</strong>{" "}
                  {f.rating}/5
                </p>

                <p>
                  <strong>Comment:</strong>{" "}
                  {f.comment}
                </p>
                 </div>
            </div>
          ))
        )}
      </div>
   
    </>
  );
}

export default AdminDashboard;
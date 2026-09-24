import { useEffect, useState } from "react";
import {
    Plus,
    Briefcase,
    Clock,
    CheckCircle,
    BadgeDollarSign,
    XCircle,
    Pencil,
    Trash2
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  // =========================
  // FETCH APPLICATIONS
  // =========================

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/applications");

      setApplications(response.data.applications);
    } catch (error) {
      setError(error.response?.data?.message || "Failed to fetch applications");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE APPLICATION
  // =========================

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?",
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`/applications/${id}`);

      setApplications((currentApplications) =>
        currentApplications.filter((application) => application._id !== id),
      );
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete application");
    }
  };

  // =========================
  // STATISTICS
  // =========================

  const totalApplications = applications.length;

  const appliedCount = applications.filter(
    (app) => app.status === "Applied",
  ).length;

  const interviewCount = applications.filter(
    (app) => app.status === "Interview",
  ).length;

  const offerCount = applications.filter(
    (app) => app.status === "Offer",
  ).length;

  const rejectedCount = applications.filter(
    (app) => app.status === "Rejected",
  ).length;

  // =========================
  // SEARCH + FILTER + SORT
  // =========================

  const filteredApplications = applications
    .filter((application) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        application.company?.toLowerCase().includes(searchText) ||
        application.role?.toLowerCase().includes(searchText);

      const matchesStatus =
        statusFilter === "All" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    })

    .sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }

      if (sortBy === "company") {
        return a.company.localeCompare(b.company);
      }

      return 0;
    });

  // =========================
  // LOADING
  // =========================

 if (loading) {
    return (
        <div className="page-message">
            <h2>Loading applications...</h2>
            <p>
                Please wait while we fetch your applications.
            </p>
        </div>
    );
}

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
        <div className="page-message">
            <h2>Something went wrong</h2>

            <p>{error}</p>

            <button
                onClick={fetchApplications}
            >
                Try Again
            </button>
        </div>
    );
}

  // =========================
  // UI
  // =========================

  return (
    <div className="dashboard">
      {/* =========================
                HEADER
            ========================= */}

      <div className="dashboard-header">
        <div>
          <h1>JobTrack</h1>

          <p>Track and manage your job applications.</p>
        </div>

        <button onClick={() => navigate("/applications/add")}>
          <Plus size={18} />
          Add Application
        </button>
      </div>

      {/* =========================
                STATISTICS
            ========================= */}

      <div className="stats-grid">
        {/* TOTAL */}

        <div className="stat-card">
          <Briefcase size={24} />

          <div>
            <p>Total Applications</p>

            <h2>{totalApplications}</h2>
          </div>
        </div>

        {/* APPLIED */}

        <div className="stat-card">
          <Clock size={24} />

          <div>
            <p>Applied</p>

            <h2>{appliedCount}</h2>
          </div>
        </div>

        {/* INTERVIEWS */}

        <div className="stat-card">
          <BadgeDollarSign size={24} />

          <div>
            <p>Interviews</p>

            <h2>{interviewCount}</h2>
          </div>
        </div>

        {/* OFFERS */}

        <div className="stat-card">
          <CheckCircle size={24} />

          <div>
            <p>Offers</p>

            <h2>{offerCount}</h2>
          </div>
        </div>

        {/* REJECTED */}

        <div className="stat-card">
          <XCircle size={24} />

          <div>
            <p>Rejected</p>

            <h2>{rejectedCount}</h2>
          </div>
        </div>
      </div>

      {/* =========================
                APPLICATION SECTION
            ========================= */}

      <div className="applications-section">
        {/* SECTION HEADER */}

        <div className="section-header">
          <div>
            <h2>My Applications</h2>

            <span>
              {filteredApplications.length} of {totalApplications} applications
            </span>
          </div>

          {/* FILTERS */}

          <div className="filters">
            {/* SEARCH */}

            <input
              type="text"
              placeholder="Search company or role..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* STATUS */}

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>

              <option value="Applied">Applied</option>

              <option value="Interview">Interview</option>

              <option value="Offer">Offer</option>

              <option value="Rejected">Rejected</option>

              <option value="Withdrawn">Withdrawn</option>
            </select>

            {/* SORT */}

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest</option>

              <option value="oldest">Oldest</option>

              <option value="company">Company A-Z</option>
            </select>
          </div>
        </div>

        {/* =========================
                    NO APPLICATIONS
                ========================= */}

        {applications.length === 0 ? (
          <div className="empty-state">
            <Briefcase size={40} />

            <h3>No applications yet</h3>

            <p>Start tracking your job applications.</p>

            <button onClick={() => navigate("/applications/add")}>
              Add Your First Application
            </button>
          </div>
        ) : filteredApplications.length === 0 ? (
          /* =========================
                        NO SEARCH RESULTS
                    ========================= */

          <div className="empty-state">
            <h3>No matching applications</h3>

            <p>Try changing your search or filter.</p>
          </div>
        ) : (
          /* =========================
                        APPLICATION LIST
                    ========================= */

          <div className="application-list">
            {filteredApplications.map((application) => (
              <div
                className="application-card"
                key={application._id}
                onClick={() => navigate(`/applications/${application._id}`)}
              >
                {/* =========================
                                        COMPANY
                                    ========================= */}

                <div className="company-info">
                  <div className="company-logo">
                    {application.company?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h3>{application.company}</h3>

                    <p>{application.role}</p>
                  </div>
                </div>

                {/* =========================
                                        DETAILS
                                    ========================= */}

                <div className="application-details">
                  {/* APPLICATION INFO */}

                  <div className="application-info">
                    {/* LOCATION */}

                    <span>
                      📍 {application.location || "Location not specified"}
                    </span>

                    {/* JOB TYPE */}

                    {application.jobType && (
                      <span>💼 {application.jobType}</span>
                    )}

                    {/* SALARY */}

                    {application.salary && <span>💰 {application.salary}</span>}

                    {/* APPLIED DATE */}

                    {application.appliedDate && (
                      <span>
                        📅{" "}
                        {new Date(application.appliedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {/* =========================
                                            ACTIONS
                                        ========================= */}

                  <div className="application-actions">
                    {/* STATUS */}

                    <span
                      className={`status ${application.status
                        ?.toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {application.status}
                    </span>

                    {/* JOB LINK */}

                    {application.jobUrl && (
                      <a
                        href={application.jobUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="job-link"
                        onClick={(e) => e.stopPropagation()}
                      >
                        View Job
                      </a>
                    )}

                    <span className="view-details">
    View Details →
</span>

                    {/* EDIT */}

                    <button
                      className="icon-btn edit-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        navigate(`/applications/edit/${application._id}`);
                      }}
                      title="Edit application"
                    >
                      <Pencil size={16} />
                    </button>

                    {/* DELETE */}

                    <button
                      className="icon-btn delete-btn"
                      onClick={(e) => {
                        e.stopPropagation();

                        handleDelete(application._id);
                      }}
                      title="Delete application"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

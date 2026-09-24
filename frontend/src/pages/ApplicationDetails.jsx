import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    ArrowLeft,
    Pencil,
    Trash2,
    MapPin,
    Briefcase,
    DollarSign,
    Calendar,
    ExternalLink
} from "lucide-react";

import api from "../services/api";

function ApplicationDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


   
    // FETCH APPLICATION
   
    useEffect(() => {

        const fetchApplication = async () => {

            try {

                setLoading(true);
                setError("");

                const response = await api.get(
                    `/applications/${id}`
                );

                setApplication(
                    response.data.application
                );

            } catch (error) {

                setError(
                    error.response?.data?.message ||
                    "Failed to fetch application"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchApplication();

    }, [id]);


    // =========================
    // DELETE APPLICATION
    // =========================

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this application?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await api.delete(
                `/applications/${id}`
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete application"
            );

        }
    };


    // =========================
    // LOADING
    // =========================

    if (loading) {

        return (
            <div className="details-page">

                <div className="details-container">

                    <h2>
                        Loading application...
                    </h2>

                </div>

            </div>
        );
    }


    // =========================
    // ERROR
    // =========================

    if (error) {

        return (
            <div className="details-page">

                <div className="details-container">

                    <button
                        className="back-btn"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                    >
                        <ArrowLeft size={18} />

                        Back to Dashboard
                    </button>

                    <div className="details-error">

                        <h2>
                            Application not found
                        </h2>

                        <p>
                            {error}
                        </p>

                    </div>

                </div>

            </div>
        );
    }


    // =========================
    // DATE FORMATTER
    // =========================

    const formatDate = (date) => {

        if (!date) {
            return "Not specified";
        }

        return new Date(
            date
        ).toLocaleDateString();
    };


    // =========================
    // STATUS CLASS
    // =========================

    const statusClass =
        application.status
            ?.toLowerCase()
            .replace(" ", "-");


    // =========================
    // UI
    // =========================

    return (

        <div className="details-page">

            <div className="details-container">


                {/* =========================
                    BACK BUTTON
                ========================= */}

                <button
                    className="back-btn"
                    onClick={() =>
                        navigate("/dashboard")
                    }
                >

                    <ArrowLeft size={18} />

                    Back to Dashboard

                </button>



                {/* =========================
                    HEADER
                ========================= */}

                <div className="details-header">

                    <div>

                        <div className="details-company-logo">

                            {application.company
                                ?.charAt(0)
                                .toUpperCase()}

                        </div>

                    </div>


                    <div className="details-title">

                        <h1>
                            {application.company}
                        </h1>

                        <p>
                            {application.role}
                        </p>

                    </div>


                    <span
                        className={`status ${statusClass}`}
                    >
                        {application.status}
                    </span>

                </div>



                {/* =========================
                    INFORMATION
                ========================= */}

                <div className="details-grid">


                    {/* LOCATION */}

                    <div className="detail-item">

                        <MapPin size={20} />

                        <div>

                            <span>
                                Location
                            </span>

                            <p>
                                {application.location ||
                                    "Not specified"}
                            </p>

                        </div>

                    </div>



                    {/* JOB TYPE */}

                    <div className="detail-item">

                        <Briefcase size={20} />

                        <div>

                            <span>
                                Job Type
                            </span>

                            <p>
                                {application.jobType ||
                                    "Not specified"}
                            </p>

                        </div>

                    </div>



                    {/* SALARY */}

                    <div className="detail-item">

                        <DollarSign size={20} />

                        <div>

                            <span>
                                Salary
                            </span>

                            <p>
                                {application.salary ||
                                    "Not specified"}
                            </p>

                        </div>

                    </div>



                    {/* APPLIED DATE */}

                    <div className="detail-item">

                        <Calendar size={20} />

                        <div>

                            <span>
                                Applied Date
                            </span>

                            <p>
                                {formatDate(
                                    application.appliedDate
                                )}
                            </p>

                        </div>

                    </div>



                    {/* DEADLINE */}

                    <div className="detail-item">

                        <Calendar size={20} />

                        <div>

                            <span>
                                Deadline
                            </span>

                            <p>
                                {formatDate(
                                    application.deadline
                                )}
                            </p>

                        </div>

                    </div>

                </div>



                {/* =========================
                    JOB URL
                ========================= */}

                {application.jobUrl && (

                    <div className="details-section">

                        <h3>
                            Job Posting
                        </h3>

                        <a
                            href={application.jobUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="details-job-link"
                        >

                            <ExternalLink size={17} />

                            View Job Posting

                        </a>

                    </div>

                )}



                {/* =========================
                    NOTES
                ========================= */}

                <div className="details-section">

                    <h3>
                        Notes
                    </h3>

                    <div className="notes-box">

                        {application.notes ||
                            "No notes added."}

                    </div>

                </div>



                {/* =========================
                    ACTIONS
                ========================= */}

                <div className="details-actions">

                    <button
                        className="details-edit-btn"
                        onClick={() =>
                            navigate(
                                `/applications/edit/${application._id}`
                            )
                        }
                    >

                        <Pencil size={17} />

                        Edit Application

                    </button>


                    <button
                        className="details-delete-btn"
                        onClick={handleDelete}
                    >

                        <Trash2 size={17} />

                        Delete Application

                    </button>

                </div>

            </div>

        </div>
    );
}

export default ApplicationDetails;
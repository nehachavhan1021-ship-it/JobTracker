import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function AddApplication() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        company: "",
        role: "",
        location: "",
        status: "Applied",
        appliedDate: "",
        deadline: "",
        salary: "",
        jobType: "",
        jobUrl: "",
        notes: ""
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

           const dataToSend = {
    ...formData,
    appliedDate:
        formData.appliedDate || undefined,
    deadline:
        formData.deadline || undefined
};

if (!formData.company.trim()) {
    setError("Company name is required.");
    return;
}

if (!formData.role.trim()) {
    setError("Job role is required.");
    return;
}

if (
    formData.jobUrl &&
    !formData.jobUrl.startsWith("http")
) {
    setError(
        "Job URL must start with http:// or https://"
    );
    return;
}
await api.post(
    "/applications",
    dataToSend
);

            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to create application"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-page">

            <div className="form-container">

                <h1>Add Application</h1>

                <p className="form-subtitle">
                    Add a job application to your tracker.
                </p>

                <form onSubmit={handleSubmit}>

                    {/* Company */}

                    <div className="form-group">
                        <label>Company *</label>

                        <input
                            type="text"
                            name="company"
                            placeholder="e.g. Google"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Role */}

                    <div className="form-group">
                        <label>Job Role *</label>

                        <input
                            type="text"
                            name="role"
                            placeholder="e.g. Java Developer"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    {/* Location */}

                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            placeholder="e.g. Pune / Remote"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Status */}

                    <div className="form-group">
                        <label>Status</label>

                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                        >
                            <option value="Applied">
                                Applied
                            </option>

                            <option value="Interview">
                                Interview
                            </option>

                            <option value="Offer">
                                Offer
                            </option>

                            <option value="Rejected">
                                Rejected
                            </option>

                            <option value="Withdrawn">
                                Withdrawn
                            </option>
                        </select>
                    </div>


                    {/* Job Type */}

                    <div className="form-group">
                        <label>Job Type</label>

                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                        >
                            <option value="">
                                Select job type
                            </option>

                            <option value="Internship">
                                Internship
                            </option>

                            <option value="Full-time">
                                Full-time
                            </option>

                            <option value="Part-time">
                                Part-time
                            </option>

                            <option value="Contract">
                                Contract
                            </option>
                        </select>
                    </div>


                    {/* Salary */}

                    <div className="form-group">
                        <label>Salary</label>

                        <input
                            type="text"
                            name="salary"
                            placeholder="e.g. 8 LPA"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Applied Date */}

                    <div className="form-group">
                        <label>Applied Date</label>

                        <input
                            type="date"
                            name="appliedDate"
                            value={formData.appliedDate}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Deadline */}

                    <div className="form-group">
                        <label>Deadline</label>

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Job URL */}

                    <div className="form-group">
                        <label>Job URL</label>

                        <input
                            type="url"
                            name="jobUrl"
                            placeholder="https://..."
                            value={formData.jobUrl}
                            onChange={handleChange}
                        />
                    </div>


                    {/* Notes */}

                    <div className="form-group">
                        <label>Notes</label>

                        <textarea
                            name="notes"
                            placeholder="Add notes about this application..."
                            value={formData.notes}
                            onChange={handleChange}
                            rows="4"
                        />
                    </div>


                    {error && (
                        <p className="form-error">
                            {error}
                        </p>
                    )}


                    <div className="form-actions">

                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                        >
                            {loading
                                ? "Saving..."
                                : "Save Application"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddApplication;
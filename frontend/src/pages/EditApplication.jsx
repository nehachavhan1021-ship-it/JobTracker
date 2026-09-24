import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function EditApplication() {
    const { id } = useParams();
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

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const response = await api.get(
                    `/applications/${id}`
                );

                const application =
                    response.data.application;

                setFormData({
                    company: application.company || "",
                    role: application.role || "",
                    location: application.location || "",
                    status: application.status || "Applied",

                    appliedDate: application.appliedDate
                        ? application.appliedDate.substring(0, 10)
                        : "",

                    deadline: application.deadline
                        ? application.deadline.substring(0, 10)
                        : "",

                    salary: application.salary || "",
                    jobType: application.jobType || "",
                    jobUrl: application.jobUrl || "",
                    notes: application.notes || ""
                });

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


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setSaving(true);
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

await api.patch(
    `/applications/${id}`,
    dataToSend
);
            navigate("/dashboard");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to update application"
            );
        } finally {
            setSaving(false);
        }
    };


    if (loading) {
        return <h2>Loading application...</h2>;
    }


    return (
        <div className="form-page">

            <div className="form-container">

                <h1>Edit Application</h1>

                <p className="form-subtitle">
                    Update your application details.
                </p>


                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                        <label>Company *</label>

                        <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Job Role *</label>

                        <input
                            type="text"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>


                    <div className="form-group">
                        <label>Location</label>

                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                        />
                    </div>


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


                    <div className="form-group">
                        <label>Salary</label>

                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Applied Date</label>

                        <input
                            type="date"
                            name="appliedDate"
                            value={formData.appliedDate}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Deadline</label>

                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Job URL</label>

                        <input
                            type="url"
                            name="jobUrl"
                            value={formData.jobUrl}
                            onChange={handleChange}
                        />
                    </div>


                    <div className="form-group">
                        <label>Notes</label>

                        <textarea
                            name="notes"
                            rows="4"
                            value={formData.notes}
                            onChange={handleChange}
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
                            onClick={() =>
                                navigate("/dashboard")
                            }
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Updating..."
                                : "Update Application"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditApplication;
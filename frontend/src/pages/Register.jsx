import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Briefcase,
    Eye,
    EyeOff,
    ArrowRight
} from "lucide-react";

import api from "../services/api";

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    setError("");

    if (!name || !email || !password) {
        setError("Please fill in all required fields.");
        return;
    }

    if (name.length < 2) {
        setError("Name must contain at least 2 characters.");
        return;
    }

    if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
    }

    if (password.length < 8) {
        setError(
            "Password must contain at least 8 characters."
        );
        return;
    }

    try {
        setLoading(true);

        await api.post("/auth/register", {
            name,
            email,
            password
        });

        navigate("/login");

    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Registration failed. Please try again."
        );
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="auth-page">

            {/* LEFT SIDE */}

            <div className="auth-brand-panel">

                <div className="auth-brand">

                    <div className="brand-icon">
                        <Briefcase size={24} />
                    </div>

                    <span>JobTrack</span>

                </div>

                <div className="brand-content">

                    <h1>
                        Organize your
                        <span> career journey.</span>
                    </h1>

                    <p>
                        Create one simple workspace to
                        manage applications, interviews,
                        offers, and everything in between.
                    </p>

                    <div className="brand-stat">

                        <strong>
                            One dashboard.
                        </strong>

                        <span>
                            Your entire job search.
                        </span>

                    </div>

                </div>

                <p className="brand-footer">
                    Start tracking smarter.
                </p>

            </div>


            {/* RIGHT SIDE */}

            <div className="auth-form-panel">

                <div className="auth-form-container">

                    <div className="mobile-brand">

                        <div className="brand-icon">
                            <Briefcase size={21} />
                        </div>

                        <span>JobTrack</span>

                    </div>

                    <div className="auth-heading">

                        <h2>
                            Create your account
                        </h2>

                        <p>
                            Start organizing your job search
                            with JobTrack.
                        </p>

                    </div>


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="auth-field">

                            <label htmlFor="name">
                                Full name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                value={formData.name}
                                onChange={handleChange}
                                autoComplete="name"
                            />

                        </div>


                        <div className="auth-field">

                            <label htmlFor="email">
                                Email address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="email"
                            />

                        </div>


                        <div className="auth-field">

                            <label htmlFor="password">
                                Password
                            </label>

                            <div className="password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="At least 8 characters"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="new-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                            <p className="field-hint">
                                Use at least 8 characters.
                            </p>

                        </div>


                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating account..."
                                : "Create Account"}

                            {!loading && (
                                <ArrowRight size={18} />
                            )}
                        </button>

                    </form>


                    <div className="auth-switch">

                        <span>
                            Already have an account?
                        </span>

                        <Link to="/login">
                            Sign in
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
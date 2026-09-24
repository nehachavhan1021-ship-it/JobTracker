import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Briefcase,
    Eye,
    EyeOff,
    ArrowRight,
    CheckCircle
} from "lucide-react";

import api from "../services/api";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
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

    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    setError("");

    if (!email || !password) {
        setError(
            "Please enter your email and password."
        );
        return;
    }

    if (!email.includes("@")) {
        setError("Please enter a valid email address.");
        return;
    }

    try {
        setLoading(true);

        const response = await api.post(
            "/auth/login",
            {
                email,
                password
            }
        );

        localStorage.setItem(
            "token",
            response.data.token
        );

        localStorage.setItem(
            "user",
            JSON.stringify(response.data.user)
        );

        navigate("/dashboard");

    } catch (error) {
        setError(
            error.response?.data?.message ||
            "Login failed. Please check your credentials."
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
                        Take control of
                        <span> your job search.</span>
                    </h1>

                    <p>
                        Keep your applications organized,
                        track interviews, and stay on top
                        of every opportunity.
                    </p>

                    <div className="brand-features">

                        <div>
                            <CheckCircle size={18} />
                            <span>
                                Track every application
                            </span>
                        </div>

                        <div>
                            <CheckCircle size={18} />
                            <span>
                                Monitor your progress
                            </span>
                        </div>

                        <div>
                            <CheckCircle size={18} />
                            <span>
                                Never miss an opportunity
                            </span>
                        </div>

                    </div>

                </div>

                <p className="brand-footer">
                    Your career journey, organized.
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
                            Welcome back
                        </h2>

                        <p>
                            Sign in to continue to your
                            JobTrack dashboard.
                        </p>

                    </div>


                    {error && (
                        <div className="auth-error">
                            {error}
                        </div>
                    )}


                    <form onSubmit={handleSubmit}>

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

                            <div className="password-label">

                                <label htmlFor="password">
                                    Password
                                </label>

                            </div>

                            <div className="password-wrapper">

                                <input
                                    id="password"
                                    type={
                                        showPassword
                                            ? "text"
                                            : "password"
                                    }
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    autoComplete="current-password"
                                />

                                <button
                                    type="button"
                                    className="password-toggle"
                                    onClick={() =>
                                        setShowPassword(
                                            !showPassword
                                        )
                                    }
                                    aria-label={
                                        showPassword
                                            ? "Hide password"
                                            : "Show password"
                                    }
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>

                            </div>

                        </div>


                        <button
                            type="submit"
                            className="auth-submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Signing in..."
                                : "Sign In"}

                            {!loading && (
                                <ArrowRight size={18} />
                            )}
                        </button>

                    </form>


                    <div className="auth-switch">

                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/register">
                            Create account
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;
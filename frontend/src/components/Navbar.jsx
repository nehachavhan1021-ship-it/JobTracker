
import { useNavigate, Link } from "react-router-dom";
import { LogOut, Briefcase } from "lucide-react";

function Navbar() {
    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    };

    return (
        <nav className="navbar">

            <div className="navbar-container">

                {/* Logo */}

                <Link
                    to="/dashboard"
                    className="navbar-logo"
                >
                    <Briefcase size={22} />
                    <span>JobTrack</span>
                </Link>


                {/* Navigation */}

                <div className="navbar-links">

                    <Link to="/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/applications/add">
                        Add Application
                    </Link>

                </div>


                {/* User */}

                <div className="navbar-user">

                    <span className="user-name">
                        {user?.name || "User"}
                    </span>

                    <button
                        className="logout-btn"
                        onClick={handleLogout}
                        title="Logout"
                    >
                        <LogOut size={17} />
                        Logout
                    </button>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;
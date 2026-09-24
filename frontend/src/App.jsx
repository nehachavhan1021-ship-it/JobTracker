import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import EditApplication from "./pages/EditApplication";
import ApplicationDetails from "./pages/ApplicationDetails";

import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <Dashboard />
                            </>
                        </ProtectedRoute>
                    }
                />


                <Route
                    path="/applications/add"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <AddApplication />
                            </>
                        </ProtectedRoute>
                    }
                />

<Route
    path="/applications/:id"
    element={
        <ProtectedRoute>
            <>
                <Navbar />
                <ApplicationDetails />
            </>
        </ProtectedRoute>
    }
/>
                <Route
                    path="/applications/edit/:id"
                    element={
                        <ProtectedRoute>
                            <>
                                <Navbar />
                                <EditApplication />
                            </>
                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/auth.routes");
const applicationRoutes = require("./routes/application.routes");

const app = express();


// =========================
// SECURITY
// =========================

app.use(helmet());


// =========================
// CORS
// =========================

const allowedOrigins = [
    "http://localhost:5173",
    "https://job-tracker-beta-tawny.vercel.app"
];

app.use(
    cors({
        origin: (origin, callback) => {

            // Allow requests without an origin
            // such as Postman or server-to-server requests
            if (!origin) {
                return callback(null, true);
            }

            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(
                new Error("Not allowed by CORS")
            );
        },

        credentials: true
    })
);


// =========================
// BODY PARSER
// =========================

app.use(
    express.json({
        limit: "10kb"
    })
);


// =========================
// ROUTES
// =========================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/applications",
    applicationRoutes
);


// =========================
// HEALTH CHECK
// =========================

app.get("/", (req, res) => {
    res.status(200).json({
        message: "JobTrack API is running"
    });
});


// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});


// =========================
// ERROR HANDLER
// =========================

app.use((error, req, res, next) => {

    console.error(error);

    if (error.message === "Not allowed by CORS") {
        return res.status(403).json({
            message: "CORS policy blocked this request"
        });
    }

    res.status(500).json({
        message: "Internal server error"
    });
});


module.exports = app;
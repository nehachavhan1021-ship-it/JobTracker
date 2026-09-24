const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
    createApplication,
    getApplications,
    getApplication,
    updateApplication,
    deleteApplication
} = require("../controllers/application.controller");
const router = express.Router();

router.post("/", authMiddleware, createApplication);

router.get("/", authMiddleware, getApplications);

router.get("/:id", authMiddleware, getApplication);

router.patch("/:id", authMiddleware, updateApplication);

router.delete("/:id", authMiddleware, deleteApplication);
module.exports = router;
const Application = require("../models/application.model");
const mongoose = require("mongoose");
const createApplication = async (req, res) => {
    try {

        const {
            company,
            role,
            location,
            status,
            appliedDate,
            deadline,
            salary,
            jobType,
            jobUrl,
            notes
        } = req.body;


        if (
            !company ||
            !company.trim()
        ) {
            return res.status(400).json({
                message:
                    "Company name is required"
            });
        }


        if (
            !role ||
            !role.trim()
        ) {
            return res.status(400).json({
                message:
                    "Job role is required"
            });
        }


        const application =
            await Application.create({

                company: company.trim(),

                role: role.trim(),

                location:
                    location?.trim() || undefined,

                status,

                appliedDate:
                    appliedDate || undefined,

                deadline:
                    deadline || undefined,

                salary:
                    salary?.trim() || undefined,

                jobType,

                jobUrl:
                    jobUrl?.trim() || undefined,

                notes:
                    notes?.trim() || undefined,

                user: req.user.userId
            });


        res.status(201).json({
            message:
                "Application created successfully",

            application
        });

    } catch (error) {

        console.error(error);

        res.status(400).json({
            message:
                "Unable to create application"
        });
    }
};

const getApplications = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Logged in user ID:", userId);

    const applications = await Application.find({
      user: userId,
    }).sort({
      createdAt: -1,
    });
console.log("Applications found:", applications);

    res.status(200).json({
      message: "Applications fetched successfully",
      applications,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findOne({
            _id: id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application fetched successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
const updateApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const allowedFields = [
    "company",
    "role",
    "location",
    "status",
    "appliedDate",
    "deadline",
    "salary",
    "jobType",
    "jobUrl",
    "notes"
];

const updates = {};

for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
    }
}

const application = await Application.findOneAndUpdate(
    {
        _id: id,
        user: req.user.userId
    },
    updates,
    {
        new: true,
        runValidators: true
    }
);

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application updated successfully",
            application
        });

    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};
const deleteApplication = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                message: "Invalid application ID"
            });
        }

        const application = await Application.findOneAndDelete({
            _id: id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        res.status(200).json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
  createApplication,
  getApplications,
  getApplication,
  updateApplication,
  deleteApplication,
};

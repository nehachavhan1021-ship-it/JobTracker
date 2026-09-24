const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        company: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
},

       role: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    maxlength: 100
},
        location: {
            type: String,
            trim: true
        },

        status: {
            type: String,
            // This means status must be one of these values.
            enum: [  
                "Applied",
                "Interview",
                "Offer",
                "Rejected",
                "Withdrawn"
            ],
            default: "Applied"
        },

        appliedDate: {
            // If the user doesn't specify an application date, it automatically uses the current date.
            type: Date,
            default: Date.now
        },

        deadline: {
            type: Date
        },

        salary: {
            type: String,
            trim: true
        },

        jobType: {
            type: String,
            enum: [
                "Internship",
                "Full-time",
                "Part-time",
                "Contract"
            ]
        },

        jobUrl: {
    type: String,
    trim: true,

    validate: {
        validator: function (value) {

            if (!value) {
                return true;
            }

            return /^https?:\/\/.+/i.test(value);
        },

        message:
            "Job URL must start with http:// or https://"
    }
},

       notes: {
    type: String,
    trim: true,
    maxlength: 2000
},

        user: {
//  This is what connects:
// Application
//       ↓
//    User //one user many application
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", //This ObjectId refers to a document from the User model.
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;
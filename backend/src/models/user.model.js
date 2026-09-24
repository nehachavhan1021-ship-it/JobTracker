const mongoose = require("mongoose");
    //   Schema = blueprint  
//  User
// │
// ├── name
// ├── email
// └── password
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true  //removes unnecessary spaces.
        },

        email: {
            type: String,
            required: true,
            unique: true, //means we don't want multiple users with the same email.
            lowercase: true, 
            trim: true
        },

       password: {
    type: String,
    required: true,
    minlength: 8
}
    },
    {
//  Mongoose automatically adds:
// createdAt
// updatedAt
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
const mongoose = require("mongoose");

const userMobileSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    middlename: {
        type: String,
    },
    lastname: {
        type: String,
    },
    profileImagePath: { type: String }
})

const userMobile = new mongoose.model("userMobile", userMobileSchema);
module.exports = userMobile;
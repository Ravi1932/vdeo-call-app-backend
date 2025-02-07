const mongoose = require("mongoose");

const Message = new mongoose.Schema({
    type: {
        type: String,
    },
    message: {
        type: String,
    },
    time: {
        type: String,
    },
    senderID: {
        type: String
    },
    receiverID: {
        type: String
    }
})

const messageSchema = new mongoose.model("chatSchema", Message);
module.exports = messageSchema;
const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  messages: [
    {
      sender: {
        type: String,
        enum: ["user", "ChatGPT"],
        required: true,
      },
      message: {
        type: String,
        required: true,
      },
      direction: {
        type: String,
        enum: ["incoming", "outgoing"],
        default: "incoming",
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

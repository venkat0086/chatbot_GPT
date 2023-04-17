const express = require("express");
const router = express.Router();
const Chat = require("../models/chat");

// Route to get all chats for a specific user
router.get("/:userId", async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.params.userId });
    res.json(chats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to create a new chat for a specific user
router.post("/:userId", async (req, res) => {
  const { sender, message, direction } = req.body;
  const chatFields = {
    user: req.params.userId,
    messages: [{ sender, message, direction }],
  };

  try {
    let chat = await Chat.findOne({ user: req.params.userId });
    if (chat) {
      chat.messages.push({ sender, message, direction });
      await chat.save();
      return res.json(chat);
    } else {
      const newChat = new Chat(chatFields);
      await newChat.save();
      return res.json(newChat);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to delete all messages for a specific user
router.delete("/:userId", async (req, res) => {
  try {
    await Chat.deleteMany({ user: req.params.userId });
    res.json({ message: "All messages deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// // Route to add a message to an existing chat
// router.put("/:chatId", async (req, res) => {
//   const { sender, message, direction } = req.body;

//   try {
//     const chat = await Chat.findById(req.params.chatId);
//     chat.messages.push({ sender, message, direction });
//     await chat.save();
//     res.json(chat);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// });

module.exports = router;

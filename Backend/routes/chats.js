const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken');
const User = require("../models/user");
const Chat = require("../models/chats");
const Event = require("../models/events");
const fetchuser = require("../middlewares/fetchuser");


router.get("/getchats/:event_id", fetchuser, async (req, res) => {
    try {
        const event_id = req.params.event_id;
        const chats = await Chat.findOne({ event_id });
        res.status(200).json(chats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
    }
);

router.put("/createchat/:event_id", fetchuser, async (req, res) => {
    const {message} = req.body;
    try{
        const user_id = req.user.id;
        const user = await User.findById(user_id).select("-password");
        const {name, photo, username} = user;
        const event_id = req.params.event_id;
        const chat = await Chat.findOne({event_id});
        if (!chat) {
            const event = await Event.findById(event_id);
            const Eventname = event.title;
            const newChat = new Chat({
                event_id,
                Eventname,
                chats: [{
                    user_id,
                    name,
                    photo,
                    username,
                    message,
                }],
            });

            await newChat.save();
            return res.status(200).json(newChat);
        }

        const newChat = {
            user_id,
            name,
            photo,
            username,
            message,
        };
        chat.chats.push(newChat);
        await chat.save();
        res.status(200).json(chat);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
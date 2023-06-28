const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken');
const Event = require("../models/events");
const fetchuser = require("../middlewares/fetchuser");
const User = require("../models/user");
const Meetings = require("../models/meetings");

// Route 1: Get all the meetings of a user
router.get("/getallmeetings", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const meetings = await Meetings.find({ "participants._id": userId });
    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 2: Add a meeting
router.post("/addmeeting/:event_id", fetchuser, async (req, res) => {
  try {
    const { title, meet_link, meet_date, meet_time, meet_duration } = req.body;
    const creator = {};
    creator._id = req.user.id;
    const user = await User.findById(creator._id);
    creator.name = user.name;
    creator.email = user.email;
    const event_id = req.params.event_id;

    const event = await Event.findById(event_id);
    const event_name = event.title;
    const collaborators = event.collaborators;
    const participants = [];
    for (let i = 0; i < collaborators.length; i++) {
      const participant = {};
      participant._id = collaborators[i]._id;
      participant.name = collaborators[i].name;
      participant.email = collaborators[i].email;
      participants.push(participant);
    }

    const meeting = new Meetings({
      event_id,
      event_name,
      participants,
      creator,
      title,
      meet_link,
      meet_date,
      meet_time,
      meet_duration,
    });
    const savedMeeting = await meeting.save();
    res.json(savedMeeting);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// Route 3: Getting all meets for a event
router.get("/getallmeets/:event_id", fetchuser, async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const meetings = await Meetings.find({ event_id: event_id });
    res.json(meetings);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

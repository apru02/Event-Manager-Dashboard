const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken');
const Event = require("../models/events");
const fetchuser = require("../middlewares/fetchuser");
const User = require("../models/user");
// Middleware to verify the auth token

// Create event route
router.post("/createevent", fetchuser, async (req, res) => {
  try {
    const {
      title,
      description,
      tags,
      eventStartDate,
      eventEndDate,
      collaborators,
    } = req.body;
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    const userCollab = {
      _id: userId,
      name: user.name,
      email: user.email,
      photo: user.photo,
      username: user.username,
    };
    collaborators.push(userCollab);

    const event = new Event({
      title,
      description,
      tags,
      eventStartDate,
      eventEndDate,
      admin: userId,
      collaborators,
    });

    await event.save();

    res.status(200).json(event);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Fetch all events route
router.get("/events", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all events and filter by the user's ID in the collaborators list
    const events = await Event.find({ "collaborators._id": userId });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Update event Status
router.put("/updateeventstatus/:id", fetchuser, async (req, res) => {
  const { isActive } = req.body;
  let success = false;
  try {
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ success, message: "Not Found" });
    }
    success = true;
    event.isActive = isActive;
    await event.save();

    res.json({ success, event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success, message: "Internal Server Error" });
  }
});

//Update events
router.put("/updateevent/:id", fetchuser, async (req, res) => {
  const {
    title,
    description,
    tags,
    collaborators,
    eventStartDate,
    eventEndDate,
    tasks,
    admin,
  } = req.body;
  try {
    // Create a newEvent object
    const newEvent = {};
    if (title) {
      newEvent.title = title;
    }
    if (description) {
      newEvent.description = description;
    }
    if (tags) {
      newEvent.tags = tags;
    }
    if (eventStartDate) {
      newEvent.eventStartDate = eventStartDate;
    }
    if (eventEndDate) {
      newEvent.eventEndDate = eventEndDate;
    }
    if (collaborators) {
      newEvent.collaborators = collaborators;
    }
    if (tasks) {
      newEvent.tasks = tasks;
    }
    if (admin) {
      newEvent.admin = admin;
    }

    let success = false;

    // Find the note to be updated and update it
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ success, message: "Not Found" });
    }
    success = true;
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: newEvent },
      { new: true }
    );
    res.json({ success, event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success, message: "Internal Server Error" });
  }
});

// Route: POST /api/createtask/:id
// Description: Create a new task for an event
router.post("/createtask/:id", async (req, res) => {
  try {
    const eventId = req.params.id;
    const { description } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create a new task and add it to the event's tasks array
    const newTask = { description };
    event.tasks.push(newTask);

    // Save the updated event
    await event.save();
    res_task = event.tasks[event.tasks.length - 1];
    res.json({ message: "Task created successfully", res_task });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route: PUT /api/edittask/:eventId/:taskId
// Description: Edit a task within an event
router.put("/edittask/:eventId/:taskId", async (req, res) => {
  try {
    const { eventId, taskId } = req.params;
    const { description, completed } = req.body;

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Find the task within the event's tasks array
    const task = event.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Update the task properties
    if (description) {
      task.description = description;
    }
    if (completed !== undefined) {
      task.completed = completed;
    }

    // Save the updated event
    await event.save();

    res.json({ message: "Task updated successfully", event });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//delete an event
router.delete("/deletevent/:id", fetchuser, async (req, res) => {
  let success = false;
  try {
    // Find the note to be delete and delete it
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send({ success, message: "No event found" });
    }

    // Allow deletion only if user owns this Note
    if (event.admin.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    event = await Event.findByIdAndDelete(req.params.id);
    success = true;
    res.json({ success, event: event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ success, message: "Internal Server Error" });
  }
});

//event search promt
router.get("/searchevent/:search", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const search = req.params.search;
    // Fetch all events and filter by the user's ID in the collaborators list
    const events = await Event.find({ "collaborators._id": userId });
    const filteredEvents = events.filter((event) => {
      return event.title.toLowerCase().includes(search.toLowerCase());
    });

    res.status(200).json(filteredEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Route for updating existing collaborators details if they were updated

router.put("/updatecollaborators/:id", fetchuser, async (req, res) => {
  let success = false;
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({success, message: "Event not found" });
    }
    const collaborators = event.collaborators;
    //console.log(collaborators);
    const newCollaborators = [];
    for (let i = 0; i < collaborators.length; i++) {
      const user = await User.findById(collaborators[i]._id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const newCollaborator = {
        _id: user._id,
        name: user.name,
        email: user.email,
        photo: user.photo,
        username: user.username,
      };
      newCollaborators.push(newCollaborator);
    }
    event.collaborators = newCollaborators;
    await event.save();
    res.status(200).json({ success, newCollaborators });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success, message: "Internal server error" });
  }
});


module.exports = router;

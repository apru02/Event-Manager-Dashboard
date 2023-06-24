const express = require("express");
const router = express.Router();
//const jwt = require('jsonwebtoken');
const Event = require("../models/events");
const fetchuser = require("../middlewares/fetchuser");
// Middleware to verify the auth token

// Create event route
router.post("/createevent", fetchuser, async (req, res) => {
  try {
    const { title, description, tags, eventStartDate, eventEndDate } = req.body;
    const userId = req.user.id;

    const event = new Event({
      title,
      description,
      tags,
      eventStartDate,
      eventEndDate,
      admin: userId,
      collaborators: [userId],
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
    const events = await Event.find({ collaborators: userId });

    res.status(200).json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//Update events
router.put("/updateevent/:id", fetchuser, async (req, res) => {
  const { title, description, tags, eventStartDate, eventEndDate } = req.body;
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

    // Find the note to be updated and update it
    let event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send("Not Found");
    }

    if (event.admin.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: newEvent },
      { new: true }
    );
    res.json({ event });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});
 //add task and edit task
 router.put("/updateevent/:id", fetchuser, async (req, res) => {
    const { title, description, tags, eventStartDate, eventEndDate } = req.body;
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
  
      // Find the note to be updated and update it
      let event = await Event.findById(req.params.id);
      if (!event) {
        return res.status(404).send("Not Found");
      }
  
      if (event.admin.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      event = await Event.findByIdAndUpdate(
        req.params.id,
        { $set: newEvent },
        { new: true }
      );
      res.json({ event });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  });

  
  // Route: POST /api/createtask/:id
  // Description: Create a new task for an event
  router.post('/createtask/:id', async (req, res) => {
    try {
      const eventId = req.params.id;
      const { description } = req.body;
  
      // Find the event by ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Create a new task and add it to the event's tasks array
      const newTask = { description };
      event.tasks.push(newTask);
  
      // Save the updated event
      await event.save();
  
      res.json({ message: 'Task created successfully', event });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
  // Route: PUT /api/edittask/:eventId/:taskId
  // Description: Edit a task within an event
  router.put('/edittask/:eventId/:taskId', async (req, res) => {
    try {
      const { eventId, taskId } = req.params;
      const { description, completed } = req.body;
  
      // Find the event by ID
      const event = await Event.findById(eventId);
      if (!event) {
        return res.status(404).json({ message: 'Event not found' });
      }
  
      // Find the task within the event's tasks array
      const task = event.tasks.id(taskId);
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
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
  
      res.json({ message: 'Task updated successfully', event });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

  //delete an event
  router.delete("/deletevent/:id", fetchuser, async (req, res) => {
      try {
        // Find the note to be delete and delete it
        let event = await Event.findById(req.params.id);
        if (!event) {
          return res.status(404).send("Not Found");
        }
    
        // Allow deletion only if user owns this Note
        if (event.admin.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
        }
    
        note = await Event.findByIdAndDelete(req.params.id);
        res.json({ Success: "Event has been deleted", event: event });
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
    });

  
module.exports = router;

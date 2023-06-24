const mongoose = require("mongoose");
const { Schema } = mongoose;


const taskSchema = new mongoose.Schema({
    description: {
      type: String,
      required: true
    },
    completed: {
      type: Boolean,
      default: false
    }
  });

const EventsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  eventStartDate: {
    type: String,
    
  },
  eventEndDate: {
    type: String,
  
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  collaborators:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  admin:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  tasks: [taskSchema],
  date_created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("events", EventsSchema);




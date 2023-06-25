const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  email: String,
  photo: String,
  username: String,
});

const taskSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const eventsSchema = new Schema({
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
  eventStartDate: String,
  eventEndDate: String,
  isActive: {
    type: Boolean,
    default: true,
  },
  collaborators: [userSchema],
  admin: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  tasks: [taskSchema],
  date_created: {
    type: Date,
    default: Date.now,
  },
});

const EventsModel = mongoose.model("Event", eventsSchema);
module.exports = EventsModel;

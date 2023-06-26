const mongoose = require("mongoose");
const { Schema } = mongoose;

const chatSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  name: String,
  photo: String,
  username: String,
  message: String,
  date: {
    type: Date,
    default: Date.now,
    },

});

const EventChatSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "EventsModel",
    },
    chats: [chatSchema],
    Eventname : String,
});

const ChatModel = mongoose.model("Chat", EventChatSchema);
module.exports = ChatModel;
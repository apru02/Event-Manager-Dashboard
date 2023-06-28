const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    name: String,
    email: String,
});

const meetingSchema = new Schema({
    event_id: {
        type: Schema.Types.ObjectId,
        ref: "EventsModel",
    },
    event_name: {
        type: String,
        required: true,
    },
    participants: [userSchema],
    creator: userSchema,
    title: {
        type: String,
        required: true,
    },
    meet_link: {
        type: String,
        required: true,
    },
    meet_date: {
        type: String,
        required: true,
    },
    meet_time: {
        type: String,
        required: true,
    },
    meet_duration: {
        type: String,
        required: true,
    },

    date_created: {
        type: Date,
        default: Date.now,
    },
});

const MeetingsModel = mongoose.model("Meeting", meetingSchema);
module.exports = MeetingsModel;


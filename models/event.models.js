const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    eventMode: {
        type: String,
        required: true,
        enum: ['Online', 'Offline']
    },
    thumbnail: { 
        type: String,
        required: true
    },
    hostedby: [{
        type: String,
        required: true
    }],
    details: {
        type: String,
        required: true
    },
    dressCode: {
        type: String,
    },
    AgeRestrictions: { 
        type: String
    },
    eventTags: [{
        type: String,
        required: true
    }],
    address: {
        type: String,
        required: true
    },
    price: {
        type: String, 
        required: true
    },
    speakers: [{
        type: String,
        required: true
    }]
}, {
    timestamps: true
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
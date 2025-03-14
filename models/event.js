const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date
    },
    allDay: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Event', eventSchema);

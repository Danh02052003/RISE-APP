// models/activitiesModel.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const activitySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    alt: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Activity = mongoose.model('Activity', activitySchema);
module.exports = Activity;

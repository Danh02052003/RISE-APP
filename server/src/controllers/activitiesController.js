// controllers/activitiesController.js
const Activity = require('../models/activitiesModel');

// Get all activities
const getAllActivities = async (req, res) => {
    try {
        const activities = await Activity.find();
        res.json(activities);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching activities', error: error.message });
    }
};

// Create new activities
const createActivity = async (req, res) => {
    const activities = req.body;

    // Check if the request body is an array
    if (!Array.isArray(activities) || activities.length === 0) {
        return res.status(400).json({ msg: 'Please provide an array of activities' });
    }

    try {
        // Validate each activity object and prepare them for insertion
        const validActivities = activities.map(activity => {
            const { name, alt, src } = activity;
            if (!name || !alt || !src) {
                throw new Error('Each activity must have name, alt, and src properties');
            }
            return { name, alt, src };
        });

        // Insert multiple activities into the database
        const newActivities = await Activity.insertMany(validActivities);
        res.status(201).json(newActivities);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding new activities', error: error.message });
    }
};


// Update an activity
const updateActivity = async (req, res) => {
    try {
        const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedActivity) return res.status(404).json({ msg: 'Activity not found' });
        res.json(updatedActivity);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating the activity', error });
    }
};

// Delete an activity
const deleteActivity = async (req, res) => {
    try {
        const result = await Activity.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ msg: 'Activity not found for deletion' });
        res.json({ msg: 'Activity deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting the activity', error });
    }
};

// Export controller functions
module.exports = {
    getAllActivities,
    createActivity,
    updateActivity,
    deleteActivity,
};

// routes/activitiesRoutes.js
const express = require('express');
const { 
    getAllActivities, 
    createActivity, 
    updateActivity, 
    deleteActivity 
} = require('../controllers/activitiesController');

const router = express.Router();

// Routes for Activities
router.get('/', getAllActivities); // Get all activities
router.post('/', createActivity);    // Create a new activity
router.patch('/:id', updateActivity); // Update an existing activity
router.delete('/:id', deleteActivity); // Delete an activity

module.exports = router;

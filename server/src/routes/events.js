// routes/events.js
const express = require('express');
const { 
    getAllEvents, 
    // getEventById, 
    createEvents, 
    deleteEvent, 
    updateEvent,
//    findEvents
} = require('../controllers/eventsController');

const router = express.Router();

// Get all events with search functionality
router.get('/', getAllEvents);

// Search events by any field
//router.get('/search', findEvents);

// Other routes remain the same
//router.get('/:id', getEventById);
router.post('/', createEvents);
router.delete('/:id', deleteEvent);
router.patch('/:id', updateEvent);

module.exports = router;
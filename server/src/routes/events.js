const express = require('express');
const { 
    getAllEvents, 
    getEventByEventId, 
    createEvents, 
    deleteEvent, 
    updateEvent,
    findEvents  // Import the new search function
} = require('../controllers/eventsController');

const router = express.Router();

// Get all events with search functionality
router.get('/', getAllEvents);

// Search events by title, date, or category
router.get('/search', findEvents);

// Other routes remain the same
router.get('/:id', getEventByEventId);
router.post('/', createEvents);
router.delete('/:id', deleteEvent);
router.patch('/:id', updateEvent);

module.exports = router;

// controllers/eventsController.js
const Event = require('../models/eventsModel');

// Get all events with search functionality
const getAllEvents = async (req, res) => {
    try {
        const {
            eventId,
            search,
            title,
            participants,
            typeOfEvent,
            minLasts,
            maxLasts,
            startDate,
            endDate,
            location,
            category,
            page = 1,       
            limit = 10,   
            sort = '-createdAt'
        } = req.query;

        let query = {};

        // Add eventId to search criteria
        if (eventId) {
            query.eventId = eventId;
        }

        // Text search across multiple fields
        if (search) {
            query.$text = { $search: search };
        }

        // Individual field filters
        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        if (participants) {
            query.participants = participants;
        }

        if (typeOfEvent) {
            query.typeOfEvent = { $regex: typeOfEvent, $options: 'i' };
        }

        // Duration range
        if (minLasts || maxLasts) {
            query.lasts = {};
            if (minLasts) query.lasts.$gte = Number(minLasts);
            if (maxLasts) query.lasts.$lte = Number(maxLasts);
        }

        // Date range
        if (startDate || endDate) {
            query.date = {};
            if (startDate) query.date.$gte = new Date(startDate);
            if (endDate) query.date.$lte = new Date(endDate);
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (category) {
            query.category = { $in: Array.isArray(category) ? category : [category] };
        }

        // Calculate pagination values
        const pageNum = parseInt(page);
        const limitNum = parseInt(limit);
        const skip = (pageNum - 1) * limitNum;

        // Execute query with pagination
        const events = await Event.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limitNum);

        // Get total count for pagination
        const total = await Event.countDocuments(query);

        res.json({
            events,
            pagination: {
                currentPage: pageNum,
                totalPages: Math.ceil(total / limitNum),
                totalEvents: total,
                eventsPerPage: limitNum,
                hasNextPage: pageNum * limitNum < total,
                hasPrevPage: pageNum > 1
            }
        });

    } catch (error) {
        res.status(500).json({ 
            msg: 'Error fetching event list', 
            error: error.message 
        });
    }
};

// Get event by eventId
const getEventByEventId = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.eventId });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching the event', error });
    }
};

// Create a new event
const createEvents = async (req, res) => {
    const { title, participants, typeOfEvent, lasts, date, location, category, src } = req.body;

    if (!title || !participants || !typeOfEvent || !lasts || !date || !location || !category || !src) {
        return res.status(400).json({ msg: 'Please provide all event information' });
    }

    try {
        const newEvent = await Event.create({
            title,
            participants,
            typeOfEvent,
            lasts,
            date,
            location,
            category,
            src
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding new event', error: error.message });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const result = await Event.findByIdAndDelete(req.params.id);
        if (!result) return res.status(404).json({ msg: 'Event not found for deletion' });
        res.json({ msg: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting the event', error });
    }
};

// Update an event
const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedEvent) return res.status(404).json({ msg: 'Event not found for updating' });
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating the event', error });
    }
};

module.exports = {
    getAllEvents,
    getEventByEventId,
    createEvents,
    deleteEvent,
    updateEvent
};
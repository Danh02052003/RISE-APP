const Event = require('../models/eventsModel');

// Get all events with search functionality
const getAllEvents = async (req, res) => {
    try {
        const {
            eventId,
            search,
            title,
            minRegistrations,
            maxRegistrations,
            organizerName,
            minPrice,
            maxPrice,
            categories,
            startDate,
            endDate,
            location,
            skills,
            status,
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

        // Registration range filter
        if (minRegistrations || maxRegistrations) {
            query['registrations.current'] = {};
            if (minRegistrations) query['registrations.current'].$gte = Number(minRegistrations);
            if (maxRegistrations) query['registrations.current'].$lte = Number(maxRegistrations);
        }

        // Organizer name filter
        if (organizerName) {
            query['organizer.name'] = { $regex: organizerName, $options: 'i' };
        }

        // Price range filter
        if (minPrice || maxPrice) {
            query['pricing.finalPrice'] = {};
            if (minPrice) query['pricing.finalPrice'].$gte = Number(minPrice);
            if (maxPrice) query['pricing.finalPrice'].$lte = Number(maxPrice);
        }

        // Categories filter
        if (categories) {
            query.categories = {
                $in: Array.isArray(categories) ? categories : [categories]
            };
        }

        // Date range filter
        if (startDate || endDate) {
            query['schedule.date'] = {};
            if (startDate) query['schedule.date'].$gte = new Date(startDate);
            if (endDate) query['schedule.date'].$lte = new Date(endDate);
        }

        // Location search
        if (location) {
            query.$or = [
                { 'location.name': { $regex: location, $options: 'i' } },
                { 'location.address.street': { $regex: location, $options: 'i' } },
                { 'location.address.district': { $regex: location, $options: 'i' } },
                { 'location.address.city': { $regex: location, $options: 'i' } }
            ];
        }

        // Skills filter
        if (skills) {
            const skillsArray = Array.isArray(skills) ? skills : [skills];
            query['skills.name'] = { $in: skillsArray };
        }

        // Status filter
        if (status) {
            query.status = status;
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

// Create a new event
const createEvents = async (req, res) => {
    const {
        eventId,
        title,
        description,
        registrations,
        organizer,
        pricing,
        categories,
        schedule,
        location,
        skills,
        refundPolicy,
        images,
        tags,
        status,
        ticketSalesEnd
    } = req.body;

    // Validate required fields
    if (!title || !description || !organizer || !pricing || !schedule || !location || !eventId) {
        return res.status(400).json({ msg: 'Please provide all required event information' });
    }

    try {
        const newEvent = await Event.create({
            eventId,
            title,
            description,
            registrations: {
                current: registrations?.current || 0,
                limit: registrations?.limit || 0
            },
            organizer: {
                name: organizer.name,
                logo: organizer.logo,
                followers: organizer.followers || 0,
                attendeesHosted: organizer.attendeesHosted || 0,
                socialMedia: organizer.socialMedia || {}
            },
            pricing: {
                basePrice: pricing.basePrice,
                currency: pricing.currency || 'đ',
                discount: pricing.discount || {},
                finalPrice: pricing.finalPrice
            },
            categories: Array.isArray(categories) ? categories : [categories],
            schedule: {
                date: new Date(schedule.date),
                startTime: schedule.startTime,
                endTime: schedule.endTime,
                timezone: schedule.timezone || 'CST'
            },
            location: {
                name: location.name,
                address: {
                    street: location.address.street,
                    ward: location.address.ward,
                    district: location.address.district,
                    city: location.address.city,
                    coordinates: location.address.coordinates || {}
                }
            },
            skills: skills || [],
            refundPolicy: refundPolicy || 'No policy',
            images: images || [],
            tags: tags || [],
            status: status || 'Just Added',
            ticketSalesEnd: new Date(ticketSalesEnd)
        });

        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ msg: 'Error adding new event', error: error.message });
    }
};


// Update an event by eventId
const updateEvent = async (req, res) => {
    const { eventId } = req.params;
    const updates = req.body;

    try {
        // Convert dates if they exist in the updates
        if (updates.schedule?.date) {
            updates.schedule.date = new Date(updates.schedule.date);
        }
        if (updates.ticketSalesEnd) {
            updates.ticketSalesEnd = new Date(updates.ticketSalesEnd);
        }

        const updatedEvent = await Event.findOneAndUpdate(
            { eventId },
            updates,
            { new: true, runValidators: true }
        );
        
        if (!updatedEvent) {
            return res.status(404).json({ msg: 'Event not found for updating' });
        }
        
        res.json(updatedEvent);
    } catch (error) {
        res.status(500).json({ msg: 'Error updating the event', error: error.message });
    }
};

// Get event by eventId and deleteEvent remain unchanged as they work with eventId
const getEventByEventId = async (req, res) => {
    try {
        const event = await Event.findOne({ eventId: req.params.eventId });
        if (!event) return res.status(404).json({ msg: 'Event not found' });
        res.json(event);
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching the event', error: error.message });
    }
};

const deleteEvent = async (req, res) => {
    try {
        const result = await Event.findOneAndDelete({ eventId: req.params.eventId });
        if (!result) return res.status(404).json({ msg: 'Event not found for deletion' });
        res.json({ msg: 'Event deleted successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Error deleting the event', error: error.message });
    }
};

//find event
const findEvents = async (req, res) => {
    try {
        const { title, startDate, endDate, category, location, organizerName, tags, status } = req.query;
        let query = {};

        // Full-text search across indexed fields
        if (title) {
            query.$text = { $search: title };
        }

        // Date range search
        if (startDate || endDate) {
            query['schedule.date'] = {};
            if (startDate) query['schedule.date'].$gte = new Date(startDate);
            if (endDate) query['schedule.date'].$lte = new Date(endDate);
        }

        // Category search
        if (category) {
            const categoryArray = Array.isArray(category) ? category : category.split(',');
            query.categories = { $in: categoryArray };
        }

        // Location search (by name or address fields)
        if (location) {
            query.$or = [
                { 'location.name': { $regex: location, $options: 'i' } },
                { 'location.address.street': { $regex: location, $options: 'i' } },
                { 'location.address.ward': { $regex: location, $options: 'i' } },
                { 'location.address.district': { $regex: location, $options: 'i' } },
                { 'location.address.city': { $regex: location, $options: 'i' } }
            ];
        }

        // Organizer name search
        if (organizerName) {
            query['organizer.name'] = { $regex: organizerName, $options: 'i' };
        }

        // Tags search
        if (tags) {
            const tagsArray = Array.isArray(tags) ? tags : tags.split(',');
            query.tags = { $in: tagsArray };
        }

        // Status search
        if (status) {
            query.status = status;
        }

        const events = await Event.find(query);
        res.json({ events });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching events', error: error.message });
    }
};

module.exports = {
    getAllEvents,
    getEventByEventId,
    createEvents,
    deleteEvent,
    updateEvent,
    findEvents
};
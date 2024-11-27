const Event = require("../models/eventsModel");

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
      page = 1, // Defaults to page 1
      limit = 10, // Defaults to 10 items per page
      sort = "-createdAt", // Defaults to newest first
    } = req.query;

    const query = {};

    // Add eventId to search criteria
    if (eventId) {
      query.eventId = eventId;
    }

    // Full-text search across indexed fields
    if (search) {
      query.$text = { $search: search };
    }

    // Individual field filters
    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive
    }

    // Registration range filter
    if (minRegistrations || maxRegistrations) {
      query["registrations.current"] = {};
      if (minRegistrations)
        query["registrations.current"].$gte = Number(minRegistrations);
      if (maxRegistrations)
        query["registrations.current"].$lte = Number(maxRegistrations);
    }

    // Organizer name filter
    if (organizerName) {
      query["organizer.name"] = { $regex: organizerName, $options: "i" };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query["pricing.finalPrice"] = {};
      if (minPrice) query["pricing.finalPrice"].$gte = Number(minPrice);
      if (maxPrice) query["pricing.finalPrice"].$lte = Number(maxPrice);
    }

    // Categories filter
    if (categories) {
      query.categories = {
        $in: Array.isArray(categories) ? categories : categories.split(","),
      };
    }

    // Date range filter
    if (startDate || endDate) {
      query["schedule.date"] = {};
      if (startDate) query["schedule.date"].$gte = new Date(startDate);
      if (endDate) query["schedule.date"].$lte = new Date(endDate);
    }

    // Location search
    if (location) {
      query.$or = [
        { "location.name": { $regex: location, $options: "i" } },
        { "location.address.street": { $regex: location, $options: "i" } },
        { "location.address.district": { $regex: location, $options: "i" } },
        { "location.address.city": { $regex: location, $options: "i" } },
      ];
    }

    // Skills filter
    if (skills) {
      const skillsArray = Array.isArray(skills) ? skills : skills.split(",");
      query["skills.name"] = { $in: skillsArray };
    }

    // Status filter
    if (status) {
      query.status = status;
    }

    // Pagination values
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Fetch events with pagination and sorting
    const events = await Event.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limitNum);

    // Total event count for pagination
    const total = await Event.countDocuments(query);

    res.status(200).json({
      events,
      pagination: {
        currentPage: pageNum,
        totalPages: Math.ceil(total / limitNum),
        totalEvents: total,
        eventsPerPage: limitNum,
        hasNextPage: pageNum * limitNum < total,
        hasPrevPage: pageNum > 1,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Error fetching event list", error: error.message });
  }
};

// Create a new event
const createEvents = async (req, res) => {
  try {
    const newEvent = new Event(req.body);

    // Validate required fields
    if (
      !newEvent.title ||
      !newEvent.description ||
      !newEvent.organizer ||
      !newEvent.pricing ||
      !newEvent.schedule ||
      !newEvent.location
    ) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Save the new event
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ msg: "Error creating event", error: error.message });
  }
};

// Get a single event by eventId
const getEventByEventId = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ msg: "Event not found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ msg: "Error fetching event", error: error.message });
  }
};

// Update an event by eventId
const updateEvent = async (req, res) => {
  try {
    const updates = req.body;

    // Convert dates if they exist in the updates
    if (updates.schedule?.date) {
      updates.schedule.date = new Date(updates.schedule.date);
    }
    if (updates.ticketSalesEnd) {
      updates.ticketSalesEnd = new Date(updates.ticketSalesEnd);
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { eventId: req.params.eventId },
      updates,
      { new: true, runValidators: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ msg: "Event not found for updating" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ msg: "Error updating event", error: error.message });
  }
};

// Delete an event by eventId
const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      eventId: req.params.eventId,
    });
    if (!deletedEvent)
      return res.status(404).json({ msg: "Event not found for deletion" });
    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Error deleting event", error: error.message });
  }
};

// Find events with filters
const findEvents = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      category,
      location,
      organizerName,
      tags,
      status,
    } = req.query;

    const query = {};

    if (title) {
      query.$text = { $search: title };
    }

    if (startDate || endDate) {
      query["schedule.date"] = {};
      if (startDate) query["schedule.date"].$gte = new Date(startDate);
      if (endDate) query["schedule.date"].$lte = new Date(endDate);
    }

    if (category) {
      const categoryArray = Array.isArray(category)
        ? category
        : category.split(",");
      query.categories = { $in: categoryArray };
    }

    if (location) {
      query.$or = [
        { "location.name": { $regex: location, $options: "i" } },
        { "location.address.street": { $regex: location, $options: "i" } },
        { "location.address.district": { $regex: location, $options: "i" } },
        { "location.address.city": { $regex: location, $options: "i" } },
      ];
    }

    if (organizerName) {
      query["organizer.name"] = { $regex: organizerName, $options: "i" };
    }

    if (tags) {
      const tagsArray = Array.isArray(tags) ? tags : tags.split(",");
      query.tags = { $in: tagsArray };
    }

    if (status) {
      query.status = status;
    }

    const events = await Event.find(query);
    res.status(200).json({ events });
  } catch (error) {
    res.status(500).json({ msg: "Error finding events", error: error.message });
  }
};

module.exports = {
  getAllEvents,
  createEvents,
  getEventByEventId,
  updateEvent,
  deleteEvent,
  findEvents,
};

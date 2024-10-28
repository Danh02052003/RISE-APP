const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to generate custom event ID
function generateEventId() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const year = new Date().getFullYear();
    return `EVENT-${year}-${randomNum}`;
}

const eventSchema = new Schema({
    eventId: {
        type: String,
        unique: true,
        default: generateEventId,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true,
        index: true
    },
    participants: {
        type: Number,
        required: true,
        index: true
    },
    typeOfEvent: {
        type: String,
        required: true,
        index: true
    },
    lasts: {
        type: Number,
        required: true,
        index: true
    },
    date: {
        type: Date,
        required: true,
        index: true
    },
    location: {
        type: String,
        required: true,
        index: true
    },
    category: {
        type: [String],
        required: true,
        index: true
    },
    src: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// Add text index for search
eventSchema.index({
    eventId: 'text',
    title: 'text',
    typeOfEvent: 'text',
    location: 'text',
    category: 'text'
});

eventSchema.pre('save', async function(next) {
    if (this.isNew) {
        let isUnique = false;
        let attempts = 0;
        
        // Try up to 5 times to generate a unique ID
        while (!isUnique && attempts < 5) {
            const eventId = generateEventId();
            const existingEvent = await mongoose.models.Event.findOne({ eventId });
            
            if (!existingEvent) {
                this.eventId = eventId;
                isUnique = true;
            }
            
            attempts++;
        }
        
        if (!isUnique) {
            next(new Error('Unable to generate unique event ID'));
        }
    }
    next();
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
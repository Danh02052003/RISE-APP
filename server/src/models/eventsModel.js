const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Function to generate custom event ID
function generateEventId() {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const year = new Date().getFullYear();
    return `EVENT-${year}-${randomNum}`;
}

const addressSchema = new Schema({
    street: {
        type: String,
        required: true
    },
    ward: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    coordinates: {
        latitude: Number,
        longitude: Number
    }
});

const organizerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    },
    followers: {
        type: Number,
        default: 0
    },
    attendeesHosted: {
        type: Number,
        default: 0
    },
    socialMedia: {
        facebook: String,
        instagram: String,
        linkedin: String
    }
});

const skillSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    icon: {
        type: String
    }
});

const pricingSchema = new Schema({
    basePrice: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'd'  // Vietnamese dong
    },
    discount: {
        amount: Number,
        type: {
            type: String,
            enum: ['percentage', 'fixed']
        },
        validUntil: Date
    },
    finalPrice: {
        type: Number,
        required: true
    }
});

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
    description: {
        type: String,
        required: true
    },
    registrations: {
        current: {
            type: Number,
            default: 0
        },
        limit: {
            type: Number
        }
    },
    organizer: {
        type: organizerSchema,
        required: true
    },
    pricing: {
        type: pricingSchema,
        required: true
    },
    categories: [{
        type: String,
        required: true,
    }],
    schedule: {
        date: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        timezone: {
            type: String,
            default: 'CST'
        }
    },
    location: {
        name: {
            type: String,
            required: true
        },
        address: {
            type: addressSchema,
            required: true
        }
    },
    skills: {
        type: [skillSchema],
        default: []
    },
    refundPolicy: {
        type: String,
        default: 'No policy'
    },
    images: [{
        type: [String],
        required: true
    }],
    tags: [{
        type: String,
        index: true
    }],
    status: {
        type: String,
        default: 'Just Added'
    },
    ticketSalesEnd: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
});

// Add text index for search
eventSchema.index({
    eventId: 'text',
    title: 'text',
    description: 'text',
    'location.name': 'text',
    'location.address.street': 'text',
    tags: 'text',
    categories: 'text'
});

eventSchema.pre('save', async function(next) {
    if (this.isNew) {
        let isUnique = false;
        let attempts = 0;
        
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
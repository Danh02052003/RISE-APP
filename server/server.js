require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const eventRoutes = require('./src/routes/events');
const app = express();
const PORT = 5000;
const MONGO_URI='mongodb+srv://danhnguyen02052003:soliknokia123@event.exycr.mongodb.net/eventDB'

// middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/events', eventRoutes);

// MongoDB connection options
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

// connect to DB with better error handling
mongoose.connect(MONGO_URI, mongooseOptions)
    .then(() => {
        console.log('Connected to MongoDB successfully');
        // listen for requests only after successful connection
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    });

// Handle MongoDB connection events
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
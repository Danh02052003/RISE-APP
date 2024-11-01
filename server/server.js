const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Update these paths if needed based on your project structure
const eventRoutes = require('./src/routes/events');
const activitiesRoutes = require('./src/routes/activities');

const app = express();
const PORT = 3000;
const MONGO_URI = 'mongodb+srv://danhnguyen02052003:soliknokia123@event.exycr.mongodb.net/eventDB';

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/events', eventRoutes);
app.use('/api/activities', activitiesRoutes);

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((error) => {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB error:', err);
});
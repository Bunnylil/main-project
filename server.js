const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb+srv://brooklynqueens254:EjL5iI7Y7REXba3p@mainp.pvwly.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Define a schema for the images
const imageSchema = new mongoose.Schema({
    imageUrl: String
});

// Create a model
const Image = mongoose.model('Image', imageSchema);

// Route to fetch images
app.get('/images', async (req, res) => {
    try {
        const images = await Image.find({});
        console.log('Fetched images:', images); // Log fetched images for debugging
        res.json(images);
    } catch (error) {
        console.error('Error fetching images:', error); // Log the error
        res.status(500).json({ error: 'Failed to fetch images' });
    }
});

// Route to add a new image (optional, for testing)
app.post('/images', async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) {
            return res.status(400).json({ error: 'imageUrl is required' });
        }

        const newImage = new Image({ imageUrl });
        await newImage.save();
        console.log('New image added:', newImage); // Log the new image
        res.status(201).json(newImage);
    } catch (error) {
        console.error('Error adding image:', error); // Log the error
        res.status(500).json({ error: 'Failed to add image' });
    }
});

// Start the server and bind to all network interfaces
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
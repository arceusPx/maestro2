const express = require('express');
const axios = require('axios');
const app = express();
const port = 3001; // Choose any available port

// Sample data
const availabilityData = {
    "2024-02-05": ["9:00 AM", "10:30 AM", "1:00 PM"],
    "2024-02-06": ["8:00 AM", "10:00 AM", "12:30 PM"],
    "2024-02-07": ["8:30 AM", "11:00 AM", "2:30 PM"],
    // Add more dates and time slots as needed
};

app.get('/api/availability', async (req, res) => {
    try {
        const { selectedDate } = req.query;
        const formattedDate = new Date(selectedDate).toISOString().split('T')[0];

        // Fetch data based on the selected date
        const availableTimeSlots = availabilityData[formattedDate] || [];


        res.json(availableTimeSlots);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

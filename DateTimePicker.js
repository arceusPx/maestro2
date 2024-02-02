import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const DateTimePicker = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

    useEffect(() => {
        // Fetch available time slots based on the selected date
        fetchAvailableTimeSlots();
    }, [selectedDate]);

    const fetchAvailableTimeSlots = async () => {
        try {
            const response = await axios.get('http://localhost:3001/api/availability', {
                params: {
                    selectedDate: selectedDate.toISOString().split('T')[0], // Format date as 'YYYY-MM-DD'
                },
            });

            // Assuming the API response contains an array of available time slots
            setAvailableTimeSlots(response.data);
        } catch (error) {
            console.error('Error fetching available time slots:', error);
        }
    };

    return (
        <div>
            <h2>Select Date:</h2>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
            />

            <div>
                <h2>Available Time Slots:</h2>
                <ul>
                    {availableTimeSlots.map((timeSlot) => (
                        <li key={timeSlot}>{timeSlot}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DateTimePicker;

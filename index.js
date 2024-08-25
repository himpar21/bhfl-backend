const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// POST Route
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    if (!data || !Array.isArray(data)) {
        return res.status(400).json({ is_success: false, message: 'Invalid Input' });
    }

    const numbers = [];
    const alphabets = [];
    let highestLowerCase = '';

    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && /^[a-zA-Z]$/.test(item)) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (highestLowerCase === '' || item > highestLowerCase)) {
                highestLowerCase = item;
            }
        }
    });

    res.status(200).json({
        is_success: true,
        user_id: 'john_doe_17091999', // Replace with your user_id
        email: 'john@xyz.com',         // Replace with your email
        roll_number: 'ABCD123',        // Replace with your roll_number
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowerCase ? [highestLowerCase] : []
    });
});

// GET Route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

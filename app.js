require('dotenv').config();

const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Database connection setup
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Export the db object
module.exports = db;

// Middleware to parse JSON bodies
app.use(express.json());

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Route to add a new habit
// app.post('/add-card', (req, res) => {
//     console.log(req)
    
//     const numbers = req.body.numbers;
//     const suits = req.body.suits
//     // Insert the new habit into the database
//     const query = 'INSERT INTO cards (deck_id, arcana, card_name, card_value) VALUES (1, "Minor", ?, ?)';
//     db.query(query, [card_value, suits], (err, results) => {
//         if (err) {
//             console.error('Error inserting data:', err);
//             return res.status(500).json({ error: 'Error adding card' });
//         }
//         res.json({ message: 'Card added successfully!' });
//     });
// });

// Example route to fetch data from the database
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM wardrobe_cities';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database query failed:', err);  // Log the exact error
            return res.status(500).send('Database query failed');
        }
        // console.log(results);
        res.json(results); // Send the results as a JSON response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
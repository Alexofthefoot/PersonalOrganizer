const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Database connection setup
const db = mysql.createConnection({
    host: 'alexgeneraldb-do-user-15427317-0.m.db.ondigitalocean.com',
    user: 'doadmin',
    password: 'AVNS_KLnDwRMV3gE_7Urv9o3', 
    database: 'ALEX',
    port: 25060
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// Serve static files (like your existing HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route for the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example route to fetch data from the database
app.get('/data', (req, res) => {
    const query = 'SELECT * FROM your_table_name'; // Replace with your table name
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).send('Database query failed');
        }
        res.json(results); // Send the results as a JSON response
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const path = require('path');
const app = express();

// Define port
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, '../')));

// Database connection
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '', 
    database: 'eco_drive'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('✅ Connected to MySQL Database');
});

// Contact form submission
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // Log the received data
    console.log('Received contact form data:', req.body);

    const sql = `INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)`;
    db.query(sql, [name, email, subject, message], (err, result) => {
        if (err) {
            console.log('Error:', err);
            return res.status(500).json({ error: 'Error submitting form' });
        } else {
            console.log('Data inserted:', result);
            res.status(200).json({ 
                success: true, 
                message: 'Form submitted successfully' 
            });
        }
    });
});

// User registration
app.post('/api/signup', (req, res) => {
    const { fullname, email, password } = req.body;
    
    // First check if user already exists
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
        if (err) {
            console.log('Error checking user:', err);
            return res.status(500).json({ error: 'Error during registration' });
        }
        
        if (results.length > 0) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        // If user doesn't exist, create new user
        const sql = `INSERT INTO users (fullname, email, password) VALUES (?, ?, ?)`;
        db.query(sql, [fullname, email, password], (err, result) => {
            if (err) {
                console.log('Error:', err);
                return res.status(500).json({ error: 'Error during registration' });
            } else {
                console.log('User registered:', result);
                res.status(200).json({ 
                    success: true, 
                    message: 'Registration successful' 
                });
            }
        });
    });
});

// User login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Log login attempt
    console.log('Login attempt for email:', email);
    
    // Input validation
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.log('Database error:', err);
            return res.status(500).json({ error: 'Error during login' });
        }
        
        if (results.length === 0) {
            return res.status(401).json({ error: 'Email not found' });
        }

        const user = results[0];
        
        // Compare passwords
        if (password === user.password) { // Note: In a real app, use proper password hashing
            console.log('Login successful for user:', user.fullname);
            res.status(200).json({ 
                success: true, 
                message: 'Login successful',
                user: {
                    id: user.id,
                    fullname: user.fullname,
                    email: user.email,
                    created_at: user.created_at
                }
            });
        } else {
            console.log('Invalid password for user:', email);
            res.status(401).json({ error: 'Invalid password' });
        }
    });
});

// Routes for HTML pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
});

app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
});

app.get('/signup.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/signup.html'));
});

app.get('/profile.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/profile.html'));
});

app.get('/contact.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/contact.html'));
});

app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/about.html'));
});

app.get('/vehicles.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/vehicles.html'));
});

// Start server
app.listen(PORT, () => {
    console.log('\n=== Server Status ===');
    console.log(`✅ Server running on: http://localhost:${PORT}`);
    console.log('\n👉 Open this link in your browser to view the website: http://localhost:3000');
    console.log('==================\n');
});
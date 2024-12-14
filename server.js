const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the "public" folder

// Temporary in-memory user database
const users = [];

// Sign-Up Route
app.post('/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "Fields cannot be empty!" });
    }
    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: "User already exists!" });
    }
    users.push({ email, password });
    res.json({ success: true, message: "User registered successfully!" });
});

// Login Route
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true, message: "Login successful!" });
    } else {
        res.json({ success: false, message: "Invalid credentials!" });
    }
});

// Start the Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

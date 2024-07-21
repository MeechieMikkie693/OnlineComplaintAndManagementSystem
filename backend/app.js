const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 8000;

app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);

mongoose.connect('mongodb://localhost:27017/ResolveRadar'
    // , {useNewUrlParser: true, useUnifiedTopology: true,}
)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log('Error connecting to the database', err.message);
    });

// Middleware
app.use(express.json());

// Routes
app.use('/students', studentRoutes);
app.use('/complaints', complaintRoutes);
app.use('/employees', employeeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
});

app.use((req, res, next) => {
    console.log(`Request received at ${req.url}`);
    next();
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

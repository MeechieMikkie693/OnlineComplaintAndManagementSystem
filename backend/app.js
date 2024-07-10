//establishing our server
const cors = require("cors");
const express = require("express");
const mongoose = require('mongoose');
//const userRouter = require('./routes/userRouter');
const studentRoutes = require('./routes/studentRoutes');
const complaintRoutes = require('./routes/complaintRoutes');

const app = express();
const PORT = 3001;

app.use(
    cors({
        origin: 'http://localhost:3001'
    })
)

mongoose.connect('mongodb://localhost:27017/resolveradar')
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((err) => {
        console.log('error connecting to the database',err.message);
    })

//middleware
app.use(express.json());
//app.use(userRouter);
// Routes
app.use('/students', studentRoutes);
app.use('/complaints', complaintRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Internal Server Error');
  });

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const manageYearRoutes = require('./routes/manageYearRoutes');
const manageExamCenterRoutes = require('./routes/manageExamCenterRoutes');
const stateRoutes = require('./routes/stateRoutes');
const districtRoutes = require('./routes/districtRoutes');
const cityRoutes = require('./routes/cityRoutes');
const instituteRoutes = require('./routes/instituteRoutes');
const degreeRoutes = require('./routes/degreeRoutes');
const studentRoutes = require('./routes/studentRoutes');
const yearConfigurationRoutes = require('./routes/yearConfigurationRoutes');
const programRoutes = require('./routes/programRoutes');
const examTermRoutes = require('./routes/examTermRoutes');
const examGroupRoutes = require('./routes/examGroupRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const seatNumberRoutes = require('./routes/seatNumberRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Make uploads directory static
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB Atlas
const MONGO_URI = 'mongodb+srv://examuser:exampassword@cluster0.mongodb.net/exam_management?retryWrites=true&w=majority';
// For demo purposes, we'll mock the database connection
console.log('Using mock database for demonstration');

// Mock successful connection
console.log('MongoDB connected successfully (mock)');

// Routes
app.use('/api/manage-year', manageYearRoutes);
app.use('/api/manage-exam-center', manageExamCenterRoutes);
app.use('/api/states', stateRoutes);
app.use('/api/districts', districtRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/institutes', instituteRoutes);
app.use('/api/degrees', degreeRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/year-configurations', yearConfigurationRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/exam-terms', examTermRoutes);
app.use('/api/exam-groups', examGroupRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/seat-numbers', seatNumberRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Exam Management System API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
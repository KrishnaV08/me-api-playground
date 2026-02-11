require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./models/Profile');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'API is running' });
});

// Create/Update Profile (POST)
app.post('/profile', async (req, res) => {
  try {
    // Delete existing profile and create new one
    await Profile.deleteMany({});
    const profile = new Profile(req.body);
    await profile.save();
    res.status(201).json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search projects by skill (GET)
app.get('/projects', async (req, res) => {
  try {
    const { skill } = req.query;
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    if (!skill) {
      return res.json(profile.projects);
    }
    
    // Filter projects that might mention the skill
    const filteredProjects = profile.projects.filter(project => 
      project.description.toLowerCase().includes(skill.toLowerCase()) ||
      project.name.toLowerCase().includes(skill.toLowerCase())
    );
    
    res.json(filteredProjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get Profile (GET)
app.get('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update Profile (PUT)
app.put('/profile', async (req, res) => {
  try {
    const profile = await Profile.findOne();
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Search skills (GET)
app.get('/skills/search', async (req, res) => {
  try {
    const { q } = req.query;
    const profile = await Profile.findOne();
    
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    
    if (!q) {
      return res.json(profile.skills);
    }
    
    const filteredSkills = profile.skills.filter(skill => 
      skill.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json(filteredSkills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

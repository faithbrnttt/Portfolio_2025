const Project = require('../models/Project');

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create project with image upload
const createProject = async (req, res) => {
  try {
    const imageUrl = req.file?.location || ''; // S3 URL
    const project = new Project({
      ...req.body,
      imageUrl,
    });
    const saved = await project.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update project and optionally replace image
const updateProject = async (req, res) => {
  try {
    const imageUrl = req.file?.location;
    const updateData = { ...req.body };
    if (imageUrl) updateData.imageUrl = imageUrl;

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/projectController.js
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject 
};


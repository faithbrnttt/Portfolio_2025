// controllers/projectController.js
const Project = require('../models/Project');

const toTechArray = (val) => {
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(t => t.trim()).filter(Boolean);
  return String(val).split(',').map(t => t.trim()).filter(Boolean);
};
const pick = (obj, keys) =>
  keys.reduce((acc, k) => (obj[k] !== undefined ? (acc[k] = obj[k], acc) : acc), {});

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create project with image upload
// controllers/projectController.js (snippet)
const createProject = async (req, res) => {
  try {
    const file = req.file; // from multer-s3
    const image = file
      ? {
        url: file.location,
        key: file.key,
        bucket: file.bucket,
        etag: file.etag,
        mimetype: file.mimetype,
        size: file.size,
      }
      : undefined;

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      codeUrl: req.body.codeUrl || req.body.repoUrl,  // support either name
      technologies: req.body.technologies,            // CSV handled by model setter
      image,
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
    const updateData = pick(req.body, ['title', 'description', 'appUrl']);
    if (req.body.codeUrl || req.body.repoUrl) {
      updateData.codeUrl = req.body.codeUrl || req.body.repoUrl;
    }
    if (req.body.technologies !== undefined) {
      updateData.technologies = toTechArray(req.body.technologies);
    }
    if (req.file?.location) {
      updateData.imageUrl = req.file.location;
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };

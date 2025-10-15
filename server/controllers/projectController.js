// controllers/projectController.js (multer-s3 version)
const Project = require('../models/Project');

const toTechArray = (val) => {
  if (val == null) return [];
  if (Array.isArray(val)) return val.map(t => t.trim()).filter(Boolean);
  try { const arr = JSON.parse(val); if (Array.isArray(arr)) return arr.map(t => String(t).trim()).filter(Boolean); } catch { }
  return String(val).split(',').map(t => t.trim()).filter(Boolean);
};

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const createProject = async (req, res) => {
  try {
    const f = req.file;
    const image = f ? {
      url: f.location,
      key: f.key,
      bucket: f.bucket,
      etag: (f.etag || '').replaceAll('"', ''),
      mimetype: f.mimetype,
      size: f.size,
    } : undefined;

    const project = await Project.create({
      title: req.body.title,
      description: req.body.description,
      codeUrl: req.body.codeUrl || req.body.repoUrl,
      technologies: toTechArray(req.body.technologies),
      image,
    });

    res.status(201).json(project);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const updateProject = async (req, res) => {
  try {
    const updates = {};
    if (req.body.title !== undefined) updates.title = req.body.title;
    if (req.body.description !== undefined) updates.description = req.body.description;
    if (req.body.codeUrl || req.body.repoUrl) updates.codeUrl = req.body.codeUrl || req.body.repoUrl;
    if (req.body.technologies !== undefined) updates.technologies = toTechArray(req.body.technologies);

    if (req.file?.location) {
      updates.image = {
        url: req.file.location,
        key: req.file.key,
        bucket: req.file.bucket,
        etag: (req.file.etag || '').replaceAll('"', ''),
        mimetype: req.file.mimetype,
        size: req.file.size,
      };
    }

    const updated = await Project.findByIdAndUpdate(req.params.id, { $set: updates }, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

const deleteProject = async (req, res) => {
  try {
    // (Optional) also delete from S3 here using stored image.key
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getProjects, createProject, updateProject, deleteProject };

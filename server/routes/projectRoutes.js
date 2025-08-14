const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const {
  getProjects,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

// 'image' must match the field name in your form
router.post('/', upload.single('image'), createProject);
router.get('/', getProjects);
router.put('/:id', upload.single('image'), updateProject);
router.delete('/:id', deleteProject);

module.exports = router;

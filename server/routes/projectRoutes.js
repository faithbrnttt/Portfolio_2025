// routes/projects.js
const router = require('express').Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/projectController');
const requireAdmin = require('../middleware/requireAdmin');

// JSON body parsing (safe even if already in app.js)
const express = require('express');
router.use(express.json());

// PUBLIC (read only)
router.get('/', ctrl.getProjects);

// ADMIN ONLY (writes)
router.post('/', requireAdmin, upload.single('image'), ctrl.createProject);

// reorder must be before :id
router.put('/reorder', requireAdmin, ctrl.reorderProjects);

router.put('/:id', requireAdmin, upload.single('image'), ctrl.updateProject);
router.delete('/:id', requireAdmin, ctrl.deleteProject);

module.exports = router;
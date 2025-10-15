// routes/projects.js
const router = require('express').Router();
const upload = require('../middleware/upload'); // your multer-s3 setup
const ctrl = require('../controllers/projectController');

router.get('/', ctrl.getProjects);
router.post('/', upload.single('image'), ctrl.createProject);
router.put('/:id', upload.single('image'), ctrl.updateProject);
router.delete('/:id', ctrl.deleteProject);

module.exports = router;

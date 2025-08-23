// server/routes/projectRoutes.js
const router = require("express").Router();
const multer = require("multer");
const multerS3 = require("multer-s3");
const { S3Client } = require("@aws-sdk/client-s3");
const { getProjects, createProject, updateProject, deleteProject } = require("../controllers/projectController");

const s3 = new S3Client({ region: process.env.AWS_REGION });

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET,
    acl: "public-read",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (_req, file, cb) => cb(null, `projects/${Date.now()}-${file.originalname}`),
  }),
});

router.get("/", getProjects);
router.post("/", upload.single("image"), createProject);
router.put("/:id", upload.single("image"), updateProject); // <-- needed for edits
router.delete("/:id", deleteProject);                      // <-- needed for deletes

module.exports = router;

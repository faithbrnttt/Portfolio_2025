const multer = require('multer');
const multerS3 = require('multer-s3');
const s3 = require('../config/s3');
const { AWS_BUCKET } = process.env;

const upload = multer({
    storage: multerS3({
        s3,
        bucket: AWS_BUCKET,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        },
        key: (req, file, cb) => {
            const fileName = Date.now().toString() + '-' + file.originalname;
            cb(null, fileName);
        },
    }),
});

module.exports = upload;

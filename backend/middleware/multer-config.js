// Import multer //
const multer = require('multer');

// Map of MIME_TYPES //
const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': jpeg,
    'image/png': png
};

// Configured version of multer //
const storage = multer.diskStorage({
    // where to save the file to //
    destination: (reg,file,callback) => {
        // Error and folder //
        callback(null, 'images');
    },
    // Second argument of diskStorage function //
    filename: (reg,file,callback) => {
        // Give file name and extension //
        // Split white space and replace with underscores //
        const name = file.originalname.split(' ').join('_');
        // MIME_TYPES into file extensions //
        const extension = MIME_TYPES[file.mimetype];
        // error, name, add time stamp, ., file extension //
        callback(null, name + Date.now() + '.' + extension);
    }
});

// Export middleware //
// Call multer, pass object, upload single file, image type //
module.exports = multer({storage: storage}).single('image');
import multer from "multer";
 //  middleware that temporarily hold data on local server 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/temp'); // Folder name to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename file
  }
});


export const upload = multer({
    storage:storage
})
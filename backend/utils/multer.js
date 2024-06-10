import multer from "multer";
import path from 'path';
function fileFilter(req, file, cb) {
  console.log("FILE FILTER");
    const filetypes = /jpe?g|png|webp/;
    const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = mimetypes.test(file.mimetype);
  
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Images only!'), false);
    }
  }
const uploads=multer({
    storage:multer.diskStorage({}),
    fileFilter:fileFilter,
})
export default uploads
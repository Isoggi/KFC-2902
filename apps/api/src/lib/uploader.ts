import { ErrorHandler } from '../helpers/response';
import multer from 'multer';
import { join } from 'path';
export const uploader = (prefix: string, folderName: string) => {
  const defaultFolder = join(__dirname, '../public/images/');
  const maxSize = 5048576; // 5MB
  const config: multer.Options = {
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new ErrorHandler('Only image files are allowed!'));
      }
      const fileSize = parseInt(req.headers['content-length'] || '');
      if (fileSize > maxSize)
        return cb(new ErrorHandler('File is bigger than 5MB!'));
      cb(null, true);
    },
  };
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const destination = defaultFolder + folderName;
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      const originalNamePart = file.originalname.split('.');
      const ext = originalNamePart[originalNamePart.length - 1];
      const newFile = prefix + '-' + Date.now() + '.' + ext;
      cb(null, newFile);
    },
  });

  return multer({ storage, ...config });
};

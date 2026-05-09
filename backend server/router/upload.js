import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: function ( req, file, cb){
        cb(null, 'uploads/');
    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

export const upload =multer({storage});


<<<<<<< HEAD
=======

>>>>>>> 6b328b3b93ee8ac91d4ffb7d9bd1b22df8ca551f

import { Router } from 'express';
import { registerUser, loginUser, logoutUser} from '../Profile-verification/user.js';
import { upload } from './upload.js';
import Submission from '../profile-model/sub.js';
const router = Router();

router.route('/register').post( registerUser );
router.route('/login').post( loginUser );
router.route('/logout').post( logoutUser );

router.post("/submission", upload.single("file"), async (req, res) => {
  try {
        const savedSubmission = await Submission.create({
            filename: req.file.filename,
            path: req.file.path
        });

        res.status(200).json({
            message: "Upload successful",
            file: req.file,
            dbRecord: savedSubmission
        });

    } catch (error) {
        res.status(500).json({
            message: "upload failed",
            error
        });
        

        }

        });
export default router;




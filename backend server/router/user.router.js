import { Router } from 'express';
import { registerUser, loginUser, logoutUser} from '../Profile-verification/user.js';
import { upload } from './upload.js';
import Submission from '../profile-model/sub.js';
import { User } from '../Profile-model/user.js';
const router = Router();

router.route('/register').post( registerUser );
router.route('/login').post( loginUser );
router.route('/logout').post( logoutUser );

router.delete('/delete_profile', async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

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




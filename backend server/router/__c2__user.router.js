import { Router } from 'express';
import { registerUser, loginUser, logoutUser} from '../Profile-verification/user.js';
/* import { registerUser, loginUser, logoutUser, profileForUser, deleteUser} from '../Profile-verification/user.js'; */
/* import { upload } from './upload.js';
import Submission from '../profile-model/sub.js'; */

import User from "../models/user.model.js"; /* for delete profile route --??-- is this the correct way to import it? */

const router = Router();

router.route('/register').post( registerUser );
router.route('/login').post( loginUser );
router.route('/logout').post( logoutUser );

/* router.route('/profile').post( profileForUser );  *//* NEW */
/* router.route('/delete').delete( deleteUser ); */ /* NEW --??-- should this be /delete_profile instead? */




/* router.post("/submission", upload.single("file"), async (req, res) => {
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
 */


router.delete('/delete_profile', async (req, res) => {
    try {
        const { userId } = req.body;

        await User.findByIdAndDelete(userId);

        res.json({ message: "User deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

export default router;


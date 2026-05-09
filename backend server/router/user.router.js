import { Router } from 'express';
import { registerUser, loginUser, logoutUser} from "../Profile-verification/user.js";
import { upload } from './upload.js';
import Submission from '../profile-model/sub.js';
const router = Router();

router.route('/register').post( registerUser );
router.route('/login').post( loginUser );
router.route('/logout').post( logoutUser );



export default router;





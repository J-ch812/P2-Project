import { Router } from 'express';
import { registerUser, loginUser} from "../Profile-verification/user.js";
const router = Router();

router.route('/register').post( registerUser );
router.login('/register').post( loginUser );

export default router;

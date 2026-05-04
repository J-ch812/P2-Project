import { Router } from 'express';
import{registerUser} from '../Profile verification/user.js';
const router = Router();
router.route('/register').post(registerUser);

export default router;

import {Router} from 'express';
const router = Router();

import {auth} from '../controllers/auth.controller';

router.post('/', auth);


export default router;
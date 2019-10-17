const auth = require('../middleware/auth');
import {Router} from 'express';
const router = Router();

import {getUsers,getUser,createUser,getActualUser} from '../controllers/users.controller';

router.get('/', getUsers);
router.get('/me', auth, getActualUser);
router.get('/:id', getUser);
router.post('/', createUser);


export default router;
const auth = require('../middleware/auth');
import {Router} from 'express';
const router = Router();

import {getRank,getRanks, getRanksByUserId, createRank, updateRank,deleteRank} from '../controllers/ranks.controller';

router.get('/', getRanks);
router.get('/:id', getRank);
router.get('/users/:user_id',getRanksByUserId);
router.post('/',auth, createRank);
router.put('/:id',auth, updateRank);
router.delete('/:id',auth, deleteRank);


export default router;
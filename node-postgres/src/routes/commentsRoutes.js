const auth = require('../middleware/auth');
import {Router} from 'express';
const router = Router();

import {createComment,getComments,getCommentsByMovieId,getCommentsByUserId} from '../controllers/comments.controller';

router.get('/', getComments );
router.get('/:movie_id', getCommentsByMovieId );
router.get('/users/:user_id', getCommentsByUserId );
router.post('/',auth, createComment);


export default router;
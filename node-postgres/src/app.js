import express, {json} from 'express';
import morgan from 'morgan';

// importing routes
import auth from './routes/auth';
import usersRoutes from './routes/usersRoutes';
import ranksRoutes from './routes/ranksRoutes';
import commentsRoutes from './routes/commentsRoutes';
import cors from 'cors';

// init
const app = express();

//middleware
app.use(cors());
app.use(morgan('dev'));
app.use(json());

// routes
app.use('/api/auth',auth);
app.use('/api/users',usersRoutes);
app.use('/api/ranks',ranksRoutes);
app.use('/api/comments',commentsRoutes);

export default app;
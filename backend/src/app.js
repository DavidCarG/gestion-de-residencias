import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/projects.routes.js';
import userRoutes from './routes/user.routes.js';
import reportRoutes from './routes/report.routes.js';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', reportRoutes);

export default app;

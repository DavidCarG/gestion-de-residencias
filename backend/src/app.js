import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import projectRoutes from './routes/projects.routes.js';
import userRoutes from './routes/user.routes.js';
import reportRoutes from './routes/report.routes.js';
import cors from 'cors';
import AuthUser from './models/auth.model.js';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use('/register', (req, res) => {
  AuthUser.create(req.body)
    .then((authUser) => res.json(authUser))
    .catch((err) => res.json(err));
});

app.use('/login', (req, res) => {
  const { email, password } = req.body;
  AuthUser.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json('Success');
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  });
});
app.use('/api', userRoutes);
app.use('/api', projectRoutes);
app.use('/api', reportRoutes);

export default app;

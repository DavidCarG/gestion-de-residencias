import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  const { nombre, email, password, role, career } = req.body;

  try {
    const passwordHash = await bcryptjs.hash(password, 10); //Encriptar contrase;a
    const newUser = new User({
      nombre,
      email,
      password: passwordHash,
      role,
      career,
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie('token', token);
    res.json({
      id: userSaved._id,
      nombre: userSaved.nombre,
      email: userSaved.email,
      role: userSaved.role,
      career: userSaved.career,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(400).json({ message: 'User not found' });
    }
    const isMatch = await bcryptjs.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);
    res.json({
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.email,
      role: userFound.role,
      career: userFound.career,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json({ message: 'User not found' });

  return res.json({
    id: userFound._id,
    nombre: userFound.nombre,
    email: userFound.email,
    role: userFound.role,
    career: userFound.career,
  });
};

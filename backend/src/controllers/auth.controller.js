import AuthUser from '../models/auth.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos',
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await AuthUser.create({
      username,
      email,
      password: passwordHash,
    });

    const token = await createAccessToken({ id: newUser._id });

    res.cookie('token', token);
    res.status(201).json({
      success: true,
      message: 'Usuario creado exitosamente',
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'El usuario ya existe',
      });
    }
    res.status(500).json({
      success: false,
      message: 'Error al crear usuario',
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await AuthUser.findOne({ email });
    if (!userFound) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado',
      });
    }

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    const token = await createAccessToken({ id: userFound._id });

    res.cookie('token', token);
    res.json('Success');
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
    });
  }
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

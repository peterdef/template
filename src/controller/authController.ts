import { Request, Response } from 'express';
import authService from '../services/authService';

class AuthController {
  async login(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body;
    try {
      const isValid = await authService.login(email, password);
      if (isValid) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }

  async register(req: Request, res: Response): Promise<void> {
    const { name, email, username, password, phone } = req.body;

    if (!name || !email || !username || !password || !phone) {
      res.status(400).json({ message: 'All fields are required' });
      return;
    }

    try {
      const result = await authService.register({
        name,
        email,
        username,
        password,
        phone
      });

      if (result.success) {
        res.status(201).json({ message: result.message });
      } else {
        res.status(400).json({ message: result.message });
      }
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
  }
}

export default new AuthController();

import userRepository from '../repository/userRepository';
import { User } from '../models/entity/user';

class AuthService {
  async login(email: string, password: string): Promise<boolean> {
    const user = await userRepository.findByEmailAndPassword(email, password);
    return user !== null;
  }

  async register(userData: Omit<User, 'id'>): Promise<{ success: boolean; message: string }> {
    try {
      const existingEmail = await userRepository.findByEmail(userData.email);
      if (existingEmail) {
        return { success: false, message: 'Email already registered' };
      }

      const existingUsername = await userRepository.findByUsername(userData.username);
      if (existingUsername) {
        return { success: false, message: 'Username already taken' };
      }

      await userRepository.createUser(userData);
      return { success: true, message: 'User registered successfully' };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, message: 'Error registering user' };
    }
  }
}

export default new AuthService();

import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

class AuthService {
    async login(username: string, password: string): Promise<string> {
        const user = await User.findOne({ username });
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid credentials');
        }
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    }

    async register(username: string, password: string): Promise<void> {
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();
    }
}

export default new AuthService();

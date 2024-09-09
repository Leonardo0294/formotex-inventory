import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

class AuthController {
    async login(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            const token = await AuthService.login(username, password);
            res.json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { username, password } = req.body;
            await AuthService.register(username, password);
            res.status(201).send('User registered');
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'An unexpected error occurred' });
            }
        }
    }
}

export default new AuthController();

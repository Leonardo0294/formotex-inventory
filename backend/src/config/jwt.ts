import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET!;

export const generateToken = (userId: string): string => {
    return jwt.sign({ id: userId }, secret, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, secret);
};

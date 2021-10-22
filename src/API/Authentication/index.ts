import { sign } from "jsonwebtoken";

export default class Authentication {
    public static generateToken(payload: string | object | Buffer, expireTime?: number) {
        return sign(payload, process.env.SECRET, {
            expiresIn: expireTime || 86400 // 24 hours
        });
    };
};
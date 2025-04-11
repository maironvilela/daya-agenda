import { GeneratorUUID } from '../generator-uuid';
import crypto from 'node:crypto';

export class CryptoGenerateUUID implements GeneratorUUID {
    async generator(): Promise<string> {
        const uuid = crypto.randomBytes(16).toString('hex');
        return uuid;
    }
}
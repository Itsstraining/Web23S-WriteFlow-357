/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { DecodedIdToken } from 'firebase-admin/lib/auth/token-verifier';

@Injectable()
export class AuthService {
    constructor() { }
    async validateUser(token: string): Promise<DecodedIdToken | null> {
        token = token.replace('Bearer ', '');
        try {
            let decodedToken = await admin.auth().verifyIdToken(token);
            return decodedToken;
        } catch (error) {
            return null;
        }
    }

}

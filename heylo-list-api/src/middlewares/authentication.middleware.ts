
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as firebase from 'firebase-admin';
import { UserInfo } from 'src/shared/models/user-info';
import { FirebaseService } from 'src/shared/services/firebase/firebase.service';
import { isEmptyData } from 'src/shared/utils/common.utils';
import { UserRequestService } from '../shared/services/user-request/user-request.service';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
    private auth: firebase.auth.Auth;

    constructor(private readonly userRequestService: UserRequestService, private readonly firebaseService: FirebaseService) {
        this.auth = firebaseService.getAuth();
    }

    use(req: Request, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (isEmptyData(token)) {
            AuthenticationMiddleware.accessDenied(req.url, res);
            return;
        }
        this.auth
            .verifyIdToken(token!)
            .then(async (decodedToken: any) => {
                const userInfo: UserInfo = { id: decodedToken.uid, email: decodedToken.email, displayName: decodedToken.displayName || "" };
                this.userRequestService.UserInfo = userInfo;
                next();
            }).catch((err) => {
                AuthenticationMiddleware.accessDenied(req.url, res);
            });
    }

    private static accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            timestamp: new Date().toISOString(),
            path: url,
            message: 'access denied',
        });
    }
}

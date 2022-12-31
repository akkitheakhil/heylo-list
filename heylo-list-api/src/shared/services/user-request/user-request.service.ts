import { Injectable, Scope } from '@nestjs/common';
import { UserInfo } from '../../models/user-info';

@Injectable({ scope: Scope.REQUEST })
export class UserRequestService {
    private userinfo: UserInfo;

    get UserInfo(): UserInfo {
        return this.userinfo;
    }

    set UserInfo(userInfo: UserInfo) {
        this.userinfo = userInfo;
    }

}

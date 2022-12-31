import { Injectable } from '@nestjs/common';
import { UserRequestService } from 'src/shared/services/user-request/user-request.service';
import { PrismaApiService } from '../prisma-api/prisma-api.service';

@Injectable()
export class UserService {
    constructor(private userReqService: UserRequestService, private prismaService: PrismaApiService) { }

    async createUserIfNotExist() {
        const currentLoggedInUser = this.userReqService.UserInfo;

        const user = await this.prismaService.user.findFirst({
            select: {
                email: true
            },
            where: {
                email: currentLoggedInUser.email
            }
        });

        if (user?.email) {
            return;
        }









    }
}

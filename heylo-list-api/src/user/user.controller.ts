import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { UserService } from './user.service';


@Controller('user')
export class UserController {

    private readonly logger = new Logger(UserController.name)

    constructor(private UserService: UserService) {

    }

    @Post("/auth")
    authLogin(@Body() body: User) {
        this.logger.log(body)
    }

    @Get()
    authInfo() {
        return { status: 'Success' }
    }
}

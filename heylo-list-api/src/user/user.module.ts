import { Module } from '@nestjs/common';
import { UserRequestService } from '../shared/services/user-request/user-request.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';


@Module({
  controllers: [UserController],
  providers: [UserService, UserRequestService]
})
export class UserModule { }

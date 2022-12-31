import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ListModule } from './list/list.module';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { UserRequestService } from './shared/services/user-request/user-request.service';
import { UserModule } from './user/user.module';
import { PrismaApiModule } from './prisma-api/prisma-api.module';

@Module({
  imports: [
    UserModule,
    ListModule,
    CategoryModule,
    PrismaApiModule,
  ],
  providers: [UserRequestService, FirebaseService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthenticationMiddleware).forRoutes("*");
  }
}

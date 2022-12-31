import { Global, Module } from '@nestjs/common';
import { PrismaApiService } from './prisma-api.service';

@Global()
@Module({
  providers: [PrismaApiService],
  exports: [PrismaApiService],
})
export class PrismaApiModule { }

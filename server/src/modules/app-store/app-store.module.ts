import { Module } from '@nestjs/common';
import { AppStoreService } from './app-store.service';
import { AppStoreController } from './app-store.controller';
import { PrismaService } from 'src/services/prisma.service';
import { FileService } from 'src/services/file.service';
import { UserProvider } from 'src/users/user.provider';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [AppStoreController],
  providers: [AppStoreService, PrismaService, FileService, UserProvider, JwtService, UsersService],

})
export class AppStoreModule {}

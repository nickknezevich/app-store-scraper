import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PrismaService } from 'src/services/prisma.service';
import { AppStoreService } from '../app-store/app-store.service';
import { UserProvider } from 'src/users/user.provider';

@Module({
  providers: [TasksService, PrismaService, AppStoreService, UserProvider],
})
export class TasksModule {}
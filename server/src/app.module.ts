import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ApiResponseInterceptor } from './interceptors/api-response.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';
import { FileService } from './services/file.service';
import { AppStoreService } from './modules/app-store/app-store.service';
import { AppStoreModule } from './modules/app-store/app-store.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './modules/tasks/tasks.module';
import { ChatGPTModule } from './modules/chat-gpt/chat-gpt.module';

@Module({
  imports: [AuthModule, UsersModule, AppStoreModule, ScheduleModule.forRoot(), TasksModule, ChatGPTModule],
  controllers: [AppController],
  providers: [AppService, FileService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ApiResponseInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExceptionInterceptor,
    }
  ],
})
export class AppModule {}

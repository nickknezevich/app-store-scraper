import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpException } from '@nestjs/common';
import { AppStoreService } from './app-store.service';
import { AuthGuard } from 'src/auth/auth.guard';

import { Application } from './types/application.type';
import { AppStoreFilter } from './filters/app-store.filter';

@UseGuards(AuthGuard)
@Controller('store')
export class AppStoreController {
  constructor(private readonly appStoreService: AppStoreService) {}

  @Get()
  async list(@Query() filter: AppStoreFilter): Promise<Application[]|HttpException> {
    return await this.appStoreService.list(filter);
  }

  @Get(':id')
  async app(@Param('id') id: string): Promise<unknown|HttpException> {
    return await this.appStoreService.app(id);
  }

  @Get('reviews/:app_id')
  async reviews(@Param('app_id') appId: string): Promise<unknown|HttpException> {
    return await this.appStoreService.reviews(appId);
  }

  @Get('ratings/:app_id')
  async ratings(@Param('app_id') appId: string): Promise<unknown|HttpException> {
    return await this.appStoreService.ratings(appId);
  }


}


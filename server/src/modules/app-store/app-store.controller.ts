import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query, DefaultValuePipe, ParseIntPipe, HttpException } from '@nestjs/common';
import { AppStoreService } from './app-store.service';
import { AuthGuard } from 'src/auth/auth.guard';

import { Store } from './entities/store.entity';
import { AppStoreFilter } from './filters/app-store.filter';

@UseGuards(AuthGuard)
@Controller('store')
export class AppStoreController {
  constructor(private readonly appStoreService: AppStoreService) {}

  @Get('list')
  async list(@Query() filter: AppStoreFilter): Promise<Store|HttpException> {
    return await this.appStoreService.list(filter);
  }

  @Get('app/:id')
  async app(@Param('id') id: string): Promise<Store|HttpException> {
    return await this.appStoreService.app(id);
  }

  @Get('reviews/:app_id')
  async reviews(@Param('app_id') appId: string): Promise<Store|HttpException> {
    return await this.appStoreService.reviews(appId);
  }

  @Get('ratings/:app_id')
  async ratings(@Param('app_id') appId: string): Promise<Store|HttpException> {
    return await this.appStoreService.ratings(appId);
  }

  // @Get('app/:id')
  // async app(@Query() filter: AppStoreFilter): Promise<Store> {
  //   return await this.appStoreService.app("553834731",filter);
  // }

}


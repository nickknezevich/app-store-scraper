import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../../services/prisma.service';
import { AppStoreService } from 'src/modules/app-store/app-store.service';
import * as appStoreScraper from 'app-store-scraper';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  private prisma = new PrismaService();



  @Cron(CronExpression.EVERY_10_MINUTES)
  async syncITuneApps() {
    this.logger.debug('Syncing I Tune Apps Every Hour');
    try {


      const lastEntry = await this.prisma.syncEntry.findFirst({
        orderBy: { updated_at: 'desc' },
      });

      console.log(lastEntry)
      if (lastEntry === null) {
        await this.prisma.syncEntry.create({
          data: {
            sync_uuid: uuid()
          }
        });
        await this.syncAndSave()
        return;
      }

      if (lastEntry && this.isWithinAnHour(lastEntry.updated_at)) {
        this.logger.debug('No synchronization needed');

      } else {
        this.logger.debug('Synchronization within an hour');
        await this.syncAndSave();
        this.logger.debug('Sync Completed');
      }
    } catch (error) {
      console.log(error)
      throw new Error(`Error scraping app info: ${error.message}`);
    }
  }

  private isWithinAnHour(date: Date): boolean {
    const now = new Date();
    const hourAgo = new Date(now);
    hourAgo.setHours(now.getHours() - 1);
    return date >= hourAgo;
  }

  private async syncAndSave() {
    const appInfo = await appStoreScraper.search(
      {
        num: 100,
        term: "minecraft"
      }
    );

    appInfo.forEach(async element => {
      await this.prisma.appInfomation.create({
        data: {
          internal_app_id: String(element.id),
          app_id: element.appId,
          title: element.title,
          icon: element.icon,
          url: element.url,
          price: element.price,
          currency: element.currency,
          is_free: element.free,
          description: element.description.substring(0, 1000),
          developer: element.developer,
          developer_url: element.developerUrl,
          developer_id: element.developerId,
          genres: element.genres,
          genres_ids: element.genresIds,
          released: new Date(element.released),
          updated: new Date(element.updated),
        },
      });
    });
  }
}
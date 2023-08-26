import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as appStoreScraper from 'app-store-scraper';
import { PrismaService } from 'src/services/prisma.service';
import { UserProvider } from 'src/users/user.provider';
import { User } from '@prisma/client';
import { AppStoreFilter } from './filters/app-store.filter';


@Injectable()
export class AppStoreService {

    constructor(
        private prisma: PrismaService,
        private readonly userProvider: UserProvider,
    ) { }

    private currentUser(): User {
        return this.userProvider.user;
    }

    async list(filter: AppStoreFilter): Promise<unknown | HttpException> {
        try {
            const appInfo = await appStoreScraper.search(
                {

                    num: 10,
                    term: "minecraft"
                }
            );
            return appInfo;
        } catch (error) {
            console.log(error)
            throw new HttpException('There was a problem while retreiving object from the ITunes Store', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async search(filter: AppStoreFilter): Promise<unknown | HttpException> {
        try {
            const appInfo = await appStoreScraper.search(
                {
                    collection: appStoreScraper.collection.TOP_FREE_IPAD,
                    category: appStoreScraper.category.GAMES_ACTION,
                    num: 10
                }
            );
            return appInfo;
        } catch (error) {
            throw new HttpException('There was a problem while retreiving object from the ITunes Store', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async app(id: string): Promise<unknown | HttpException> {
        try {
            const appInfo = await appStoreScraper.app({ id: id });
            return appInfo;
        } catch (error) {
            console.log(error)
            throw new HttpException('There was a problem while retreiving object from the ITunes Store', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async reviews(id: string): Promise<unknown | HttpException> {
        try {

            const appRecord = await this.prisma.appInfomation.findFirst({
                where: {
                    app_id: id
                }
            })

            const response = await appStoreScraper.reviews({
                appId: id,
                sort: appStoreScraper.sort.HELPFUL,
            });

            response.forEach(async element => {

                await this.prisma.appReview.create({
                    data: {
                        id: parseInt(element.id),
                        app_information_id: appRecord.id,
                        username: element.userName,
                        user_url: element.userUrl,
                        version: element.version,
                        score: element.score,
                        title: element.title,
                        text: element.text,
                        url: element.url,
                    }
                })

            })

            return response;
        } catch (error) {
            console.log(error)
            throw new HttpException('There was a problem while retreiving object from the ITunes Store', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async ratings(id: string): Promise<unknown | HttpException> {
        console.log(id)
        try {
            const response = await appStoreScraper.ratings({ id });

            // find the internal app id
            const app = await this.prisma.appInfomation.findFirst({
                where: {
                    internal_app_id: id
                }
            })

            const record = await this.prisma.appRating.findUnique({
                where: {
                    app_information_id: app.id
                }
            })

            if (!record) {
                await this.prisma.appRating.create({
                    data: {
                        app_information_id: app.id,
                        ratings: response.ratings,
                        histogram: response.histogram
                    }
                })
            }

            return response;
        } catch (error) {
            console.log(error)
            throw new HttpException('There was a problem while retreiving object from the ITunes Store', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

}

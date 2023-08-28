import { defineStore } from 'pinia';

import { connector } from '@/services/connector';
const user = JSON.parse(localStorage.getItem('user') as string);

type State = {
    applications: Application[] | null
    application: Application | null
    reviews: ApplicationReview[] | null
    ratings: ApplicationRating | null
    isLoadingApplications: boolean
    isLoadingApplication: boolean
    isLoadingReviews: boolean
    isLoadingRatings: boolean
    errors: object | null
}

export type Application = {
    id: number
    app_id: string
    internal_app_id: string
    title: string
    url: string
    description: string
    released: string
    updated: string
}

export type ApplicationReview = {
    id: number
    userName: string
    userUrl: string
    version: string
    score: number
    title: string
    text: string
    url: string
}

export type ApplicationRating = {
    ratings: number
    histogram: object
}

export type Filter = {
    page: number
    num_per_page: number
    min_released_date: string
    min_updated_date: string
}

export const useApplicationsStore = defineStore({
    id: 'applications',
    state: (): State => ({
        applications: [],
        application: null,
        reviews: null,
        ratings: null,
        isLoadingApplications: false,
        isLoadingApplication: false,
        isLoadingReviews: false,
        isLoadingRatings: false,
        errors: null
    }),
    actions: {
        async getApplications(filter: Filter) {
            this.isLoadingApplications = true;
            connector.get('/api/store', {
                params: filter,
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(applications => this.applications = applications.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoadingApplications = false;
                })
        },
        async getInitialApplication() {
            if (this.applications) {
                const app = this.applications[0];
                this.isLoadingApplication = true;
                connector.get(`/api/store/${app.appId}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                })
                    .then(application => this.application = application.data.data)
                    .catch(error => this.errors = error)
                    .finally(() => {
                        this.isLoadingApplications = false;
                    })
            }

        },
        async getApplicationById(id: number) {
            this.isLoadingApplication = true;
            connector.get(`/api/store/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(application => this.application = application.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoadingApplication = false;
                })
        },
        async getReviewsByAppId(appId: string) {
            this.isLoadingReviews = true;
            connector.get(`/api/store/reviews/${appId}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(reviews => this.reviews = reviews.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoadingReviews = false;
                })
        },
        async getRatingsByAppId(id: number) {
            this.isLoadingRatings = true;
            connector.get(`/api/store/ratings/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(ratings => this.ratings = ratings.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoadingRatings = false;
                })
        },

    }
});
<script setup lang="ts">

import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { Application, ApplicationReview } from '@/stores/applications.store';
import { useApplicationsStore } from '@/stores/applications.store';
import moment from 'moment';

const applicationsStore = useApplicationsStore();
const { isloadingReviews } = storeToRefs(applicationsStore);

interface Props {
    reviews: ApplicationReview
}

const props = defineProps<Props>()

</script>

<template>
    <v-card class="flex" height="500px">
        <template v-slot:title class="ml-1">
            Reviews
        </template>
        <div v-if="reviews">
            <v-card-item v-for="review in reviews" :key="review.id">
                <span class="float-right mt-3 mr-3 text-caption text--darken-4" color="light-blue-lighten-3"
                    style="color: #4e4e4d">{{ review.updated }}</span>
                <v-rating :model-value="review.score" bg-color="orange-lighten-1" color="orange"
                    density="compact"></v-rating>
                <v-card-title><a :href="review.user_url" target="_blank<">{{ review.username }}</a></v-card-title>
                <v-card-subtitle>
                    <span class="me-1">{{ review.title }}</span>
                </v-card-subtitle>
                <v-card-subtitle>
                    <span class="me-1">{{ review.text }}</span>
                </v-card-subtitle>
            </v-card-item>
        </div>
        <div v-if="!reviews">
            <div class="pl-4" style="color: #4e4e4d">select application from the list</div>
        </div>
        <div v-if="isloadingReviews === true">
            <v-container>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-skeleton-loader class="mx-auto border" max-width="300"
                            type="card-avatar, actions"></v-skeleton-loader>
                    </v-col>

                    <v-col cols="12" md="6">
                        <v-skeleton-loader class="mx-auto border" max-width="300" type="image, article"></v-skeleton-loader>
                    </v-col>
                </v-row>
            </v-container>

        </div>
    </v-card>
</template>

<style>
.v-card {
    display: flex !important;
    flex-direction: column;
    overflow-y: scroll !important;
}
</style>
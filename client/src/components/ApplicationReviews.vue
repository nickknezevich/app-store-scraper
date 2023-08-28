<script setup lang="ts">

import { defineProps } from 'vue';
import { storeToRefs } from 'pinia';
import { Application, ApplicationReview } from '../../stores/applications.store';
import { useApplicationsStore } from '@/stores/applications.store';

const applicationsStore = useApplicationsStore();
const { isloadingReviews } = storeToRefs(applicationsStore);
import moment from 'moment';

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
            <v-card-item  v-for="review in reviews" :key="review.id">
                <span class="float-right mt-3 mr-3 text-caption text--darken-4" color="light-blue-lighten-3"
                    style="color: #4e4e4d">{{  review.updated }}</span>
                <v-rating :model-value="review.score" bg-color="orange-lighten-1" color="orange" density="compact"></v-rating>
                <v-card-title><a :href="review.userUrl" target="_blank<">{{ review.userName }}</a></v-card-title>
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
    </v-card>
</template>

<style>
.v-card {
  display: flex !important;
  flex-direction: column;
  overflow-y: scroll !important;
}
</style>
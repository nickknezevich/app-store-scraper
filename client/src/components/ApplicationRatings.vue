<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { type ApplicationRating } from '@/stores/applications.store';
import { useApplicationsStore } from '@/stores/applications.store';

const applicationsStore = useApplicationsStore();
const { isLoadingRatings } = storeToRefs(applicationsStore);
import moment from 'moment';

interface Props {
    ratings: any
}

const props = defineProps<Props>()

const calculateAverageRating = (histogramData: any) => {
    let sum = 0;
    let totalRatings = 0;

    for (const rating in histogramData.histogram) {
        const frequency = histogramData.histogram[rating];
        sum += parseInt(rating) * frequency;
        totalRatings += frequency;
    }

    const averageRating = sum / totalRatings;
    return averageRating.toFixed(2);
}

</script>
<template>
    <v-card class="mx-auto" height="500">
        <template v-slot:title class="ml-1">
            Rating Overview
        </template>
        <div v-if="ratings">
            <div class="ml-4">
                <div class="text-h2 mt-5 mb-1"> {{ calculateAverageRating(ratings) }}
                    <span class="text-h6 ml-n3">/5</span>
                </div>
                <v-rating :model-value="calculateAverageRating(ratings)" color="yellow-darken-3" half-increments density="compact"></v-rating>
                <div class="mb-2">{{ ratings.ratings }} ratings</div>
            </div>

            <v-list bg-color="transparent" class="d-flex flex-column-reverse" density="compact">

                <v-list-item>
                    <v-progress-linear :model-value="ratings.histogram['1']" :max="ratings.ratings" class="mx-n5" color="orange-darken-4"
                        height="20" rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>1</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ ratings.histogram['1'] }} </span>
                        </div>
                    </template>
                </v-list-item>

                <v-list-item>
                    <v-progress-linear :model-value="ratings.histogram['2']" :max="ratings.ratings" class="mx-n5" color="orange-lighten-2"
                        height="20" rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>2</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ ratings.histogram['2'] }} </span>
                        </div>
                    </template>
                </v-list-item>

                <v-list-item>
                    <v-progress-linear :model-value="ratings.histogram['3']" :max="ratings.ratings" class="mx-n5" color="lime-lighten-1"
                        height="20" rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>3</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ ratings.histogram['3'] }} </span>
                        </div>
                    </template>
                </v-list-item>

                <v-list-item>
                    <v-progress-linear :model-value="ratings.histogram['4']" :max="ratings.ratings" class="mx-n5" color="green-lighten-2"
                        height="20" rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>4</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ ratings.histogram['4'] }} </span>
                        </div>
                    </template>
                </v-list-item>

                <v-list-item>
                    <v-progress-linear :model-value="ratings.histogram['5']" :max="ratings.ratings" class="mx-n5" color="green-darken-1"
                        height="20" rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>5</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ ratings.histogram['5'] }} </span>
                        </div>
                    </template>
                </v-list-item>

                <!-- <v-list-item v-for="(rating, i) in ratings.histogram" :key="i">
                    <v-progress-linear :model-value="rating" class="mx-n5" color="yellow-darken-3" height="20"
                        rounded></v-progress-linear>

                    <template v-slot:prepend>
                        <span>{{ rating }}</span>
                        <v-icon icon="mdi-star" class="mx-3"></v-icon>
                    </template>

                    <template v-slot:append>
                        <div class="rating-values">
                            <span class="d-flex justify-end"> {{ rating * 224 }} </span>
                        </div>
                    </template>
                </v-list-item> -->
            </v-list>
        </div>
        <div v-if="!ratings">
            <div class="pl-4" style="color: #4e4e4d">select application from the list</div>
        </div>
    </v-card>
</template>
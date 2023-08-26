<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    imageSrc: String,
    fullName: String,
    occupation: String,
    company: String
})


</script>
<template>
    <v-card class="mx-auto user-profile" max-width="344">
        <v-img :src="imageSrc" height="200px" cover></v-img>
        <v-card-title>
            {{ fullName }}
        </v-card-title>

        <v-card-subtitle>
            <div style="color: white"><strong>{{ company }}</strong></div> {{ occupation }}
        </v-card-subtitle>

        <v-card-actions>
        </v-card-actions>        
    </v-card>
</template>
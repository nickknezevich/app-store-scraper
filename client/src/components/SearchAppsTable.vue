<script setup lang="ts">
import { Form, Field, useField, useForm } from 'vee-validate';
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
const minReleasedDate = ref(null);
const minUpdatedDate = ref(null);
import { useApplicationsStore } from '@/stores/applications.store';
const applicationsStore = useApplicationsStore();
const { applications, application, isLoading, errors } = storeToRefs(applicationsStore);

onMounted(async () => {
  await applicationsStore.getApplications();
  console.log("Mounted", true)
});

const dataTableSettings = {
    itemsPerPage: 10,
    headers: [
        // {
        //     title: 'Icon',
        //     align: 'start',
        //     sortable: false,
        //     key: 'icon',
        // },
        {
            title: 'Title',
            align: 'start',
            sortable: false,
            key: 'title',
        },
        {
            title: 'Price',
            align: 'start',
            sortable: false,
            key: 'price',
        },
        {
            title: 'Released Date',
            align: 'start',
            sortable: false,
            key: 'released',
        },
        {
            title: 'Updated Date',
            align: 'start',
            sortable: false,
            key: 'updated',
        }
    ]
}

const page = ref(1);

const searchApplications = () => {
    console.log('here')
}

</script>
<template>
    <form @submit.prevent="searchApplications">
        <v-container fluid>
            <v-row>
                <v-col cols="12" md="2">
                    <label class="mb-2">Min Released Date</label>
                    <VueDatePicker v-model="minReleasedDate" dark :enableTimePicker="false" />
                </v-col>
                <v-col cols="12" md="2">
                    <label class="mb-2">Min Updated Date</label>
                    <VueDatePicker v-model="minUpdatedDate" dark :enableTimePicker="false" />
                </v-col>
                <v-col cols="12" md="2" class="mt-7"><button class="w-100 btn btn-lg btn-success" >Search</button></v-col>
            </v-row>
        </v-container>
        
    </form>
    <v-container fluid>
            
            <v-data-table v-model:page="page" v-model:page-count="applications.length" :items-per-page="dataTableSettings.itemsPerPage" :headers="dataTableSettings.headers"
                :items="applications" :loading="isLoading"  
          class="elevation-1" height="300px">
                <template v-slot:item.icon="{ item }">
                    <div class="p-2">
                        <v-img :src="item.icon" height="32px"></v-img>
                    </div>
                </template>
                
            </v-data-table>
            
        </v-container>
</template>
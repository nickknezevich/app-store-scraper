
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useApplicationsStore } from '@/stores/applications.store';
import ApplicationInformation from '../components/ApplicationInformation.vue'
import ApplicationReviews from '../components/ApplicationReviews.vue'
import ApplicationRatings from '../components/ApplicationRatings.vue'
const applicationsStore = useApplicationsStore();
const { applications, application, reviews, ratings, isLoadingApplications, isLoadingApplication, errors } = storeToRefs(applicationsStore);
const minReleasedDate = ref(null);
const minUpdatedDate = ref(null);
const selected = ref(null)

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

const searchApplications = async () => {
	await applicationsStore.getApplications({
		min_released_date: minReleasedDate.value,
		min_updated_date: minUpdatedDate.value
	})
}

const handleRowClick = async (item, row) => {
	await applicationsStore.getApplicationById(row.item.raw.internal_app_id)
	await applicationsStore.getReviewsByAppId(row.item.raw.app_id)
	await applicationsStore.getRatingsByAppId(row.item.raw.internal_app_id)
}

onMounted(async () => {
	await applicationsStore.getApplications();
	//await applicationsStore.getInitialApplication();
	console.log("Mounted", true)

});


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
				<v-col cols="12" md="2" class="mt-7"><button class="w-100 btn btn-lg btn-success">Search</button></v-col>
			</v-row>
		</v-container>

	</form>
	<v-container fluid>

		<v-data-table v-model:page="page" v-model:page-count="applications.length"
			:items-per-page="dataTableSettings.itemsPerPage" :headers="dataTableSettings.headers" :items="applications"
			:loading="isLoadingApplications" v-model="selected"
  class="elevation-1" @click:row="handleRowClick"  height="300px">
			<template v-slot:item.icon="{ item }">
				<div class="p-2">
					<v-img :src="item.icon" height="32px"></v-img>
				</div>
			</template>

		</v-data-table>

	</v-container>
	<v-container fluid>
		<v-row align="start">
			<v-col sm="6" md="4">
				<ApplicationInformation :application="application" :ratings="ratings" :reviews="reviews"/>
			</v-col>
			<v-col sm="6" md="4">
				<ApplicationRatings  :ratings="ratings"/>
			</v-col>
			<v-col sm="6" md="4">
				<ApplicationReviews  :reviews="reviews"/>
			</v-col>

		</v-row>
	</v-container>
</template>
  
<style>
body {
	height: 100vh;
}
</style>
  


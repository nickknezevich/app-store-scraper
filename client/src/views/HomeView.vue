
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia';
import { useApplicationsStore, type Application } from '@/stores/applications.store';
import ApplicationInformation from '../components/ApplicationInformation.vue'
import ApplicationReviews from '../components/ApplicationReviews.vue'
import ApplicationRatings from '../components/ApplicationRatings.vue'
const applicationsStore = useApplicationsStore();
const { applications, application, reviews, ratings, isLoadingApplications, isLoadingApplication, errors } = storeToRefs(applicationsStore);
const minReleasedDate = ref('');
const minUpdatedDate = ref('');
const selected = ref(null)
import moment from 'moment'
import type { VDataTableRow } from 'vuetify/labs/components';

type DataTableHeader = {
	key: string;
	title: string;
	colspan?: number;
	rowspan?: number;
	fixed?: boolean;
	align?: 'start' | 'end';
	width?: number;
	minWidth?: string;
	maxWidth?: string;
	sortable?: boolean;
};

const headers: DataTableHeader[] = [
	{
		title: 'ID',
		align: 'start',
		sortable: false,
		key: 'id',
	},
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

const dataTableSettings = {
	itemsPerPage: 10,
}

const page = ref(1);
const selectedItem = ref(null)

const searchApplications = async () => {
	await applicationsStore.getApplications({
		min_released_date: minReleasedDate.value,
		min_updated_date: minUpdatedDate.value
	})
}

const handleRowClick = async (item: any, row: any) => {
	await applicationsStore.getApplicationById(row.item.raw.internal_app_id)
	await applicationsStore.getReviewsByAppId(row.item.raw.app_id)
	// setting 1000 delay because of the rate limit: 2 requests per second
	setTimeout(async function () {
		await applicationsStore.getRatingsByAppId(row.item.raw.internal_app_id)
	}, 3000);
}

onMounted(async () => {
	await applicationsStore.getApplications();
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
		<v-data-table v-if="applications !== null" v-model:page="page" v-model:page-count="applications.length"
			:items-per-page="dataTableSettings.itemsPerPage" :headers="headers" :items="applications"
			:loading="isLoadingApplications" item-selectable select-strategy="single" class="elevation-1"
			@click:row="handleRowClick" fixed-header height="300px">

			<template v-slot:item.title="{ item }">
				<strong>{{ item.columns.title }}</strong>
			</template>
			<template v-slot:item.released="{ item }">
				{{ moment(item.columns.released).format('MM/DD/YYYY HH:mm') }}
			</template>
			<template v-slot:item.updated="{ item }">
				{{ moment(item.columns.updated).format('MM/DD/YYYY HH:mm') }}
			</template>
			<!-- TODO for selecting the row -->
			<!-- <template v-slot:item="{ item }" :class="{'primary': item.id==selectedItem}">
				<tr>
					<td>{{ item.columns.id }}</td>
					<td>{{ item.columns.title }}</td>
					<td>{{ item.columns.price  }}</td>
					<td>{{ item.columns.released }}</td>
					<td>{{ item.columns.updated }}</td>
					
				</tr>
			</template> -->
		</v-data-table>
	</v-container>
	<v-container fluid>
		<v-row align="start">
			<v-col sm="6" md="4">
				<ApplicationInformation :application="application" :ratings="ratings" :reviews="reviews" />
			</v-col>
			<v-col sm="6" md="4">
				<ApplicationRatings :ratings="ratings" />
			</v-col>
			<v-col sm="6" md="4">
				<ApplicationReviews :reviews="reviews" />
			</v-col>
		</v-row>
	</v-container>
</template>
  
<style>
body {
	height: 100vh;
}

.v-data-table tbody tr.v-data-table__selected {
	background: #f5c17d70 !important;
}

.v-data-table tbody tr.v-data-table__selected {
	background: #a17b4970 !important;
}

.v-data-table tbody tr.v-data-table__selected:hover {
	background: #a17b49c2 !important;
}

.v-data-table tbody tr.v-data-table__selected:hover {
	background: #ffd296d2 !important;
}
</style>
  


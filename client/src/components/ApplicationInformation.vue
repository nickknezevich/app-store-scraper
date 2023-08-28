<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { Application, ApplicationRating, ApplicationReview } from '@/stores/applications.store';
import { useChatGptStore } from '@/stores/chat-gpt.store';
import moment from 'moment';

const chatGptStore = useChatGptStore();
const { chatGPTresponse, message, isLoading, isCompleted } = storeToRefs(chatGptStore);

interface Props {
	application: Application
	reviews: ApplicationReview
	ratings: ApplicationRating
}

const props = defineProps<Props>()

const dialogInfo = ref({
	show: false,
	text: null
});

const closeDialog = () => {
     dialogInfo.value.show = false;
}

const getFeedback = async () => {
	const message = {
		application: {
			title: props.application.title,
			app_id: props.application.app_id
		},
		reviews: props.reviews.splice(0, 10),
		question: 'Based on the provided data, determine if there are any common themes of issues and how the app could be improved?'
	}
	chatGptStore.getFeedback(message).then(() => {
		
			console.log(chatGPTresponse)
			dialogInfo.value.show = true;
			
		
		

	})
}



</script>
<template>
	<v-card class="mx-auto" height="500">
		<template v-slot:title>
			Application Information
		</template>

		<v-list height="100%" v-if="application">
			<v-list-item>
				<v-list-item-title>
					Title
				</v-list-item-title>
				<v-list-item-text class="text-blue-grey-lighten-3">
					{{ application.title }}
				</v-list-item-text>
			</v-list-item>

			<v-list-item>
				<v-list-item-title>
					App ID
				</v-list-item-title>
				<v-list-item-text class="text-blue-grey-lighten-3">
					{{ application.app_id }}
				</v-list-item-text>
			</v-list-item>

			<v-list-item>
				<v-list-item-title>
					Description
				</v-list-item-title>
				<v-list-item-text class="text-blue-grey-lighten-3">
					{{ application.description.substring(0, 300) }} ...
				</v-list-item-text>
			</v-list-item>

			<v-list-item>
				<v-list-item-title>
					Released
				</v-list-item-title>
				<v-list-item-text class="text-blue-grey-lighten-3">
					{{ application.released }}
				</v-list-item-text>
			</v-list-item>

			<v-list-item>
				<v-list-item-title>
					Released
				</v-list-item-title>
				<v-list-item-text class="text-blue-grey-lighten-3">
					{{ application.updated }}
				</v-list-item-text>
			</v-list-item>
			<v-list-item><v-btn color="success" @click="getFeedback">Get Feedback</v-btn></v-list-item>


		</v-list>
		<div v-if="!application">
			<div class="pl-4" style="color: #4e4e4d">select application from the list</div>
		</div>
		
	</v-card>
	<v-dialog v-model="dialogInfo.show" width="800">
		<v-card>
			<v-card-title>
				<span class="text-h5">Chat GPT Service Feedback <v-btn class="float-right" @click="closeDialog" variant="text">x</v-btn></span>
			</v-card-title>
			<v-card-text class="mb-2">
				{{ message }}
			</v-card-text>
		</v-card>
	</v-dialog>
</template>
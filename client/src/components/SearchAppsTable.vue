<script setup lang="ts">
import { Form, Field, useField, useForm } from 'vee-validate';
import { ref, reactive } from 'vue'
const minReleasedDate = ref(null);
const minUpdatedDate = ref(null);

const dataTable = {
    itemsPerPage: 10,
    headers: [
        {
            title: 'Icon',
            align: 'start',
            sortable: false,
            key: 'icon',
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
            title: 'Updates Date',
            align: 'start',
            sortable: false,
            key: 'updated',
        }
    ],
    items: [
        {
            app_id: 'com.mcpetools.mapsmaster',
            title: "Modern Houses for Minecraft PE",
            price: 0,
            url: "https://apps.apple.com/us/app/modern-houses-for-minecraft-pe/id1589499212?uo=4",
            icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/7f/24/b0/7f24b0f7-a665-fb8f-fc7d-85af6fb4bc5a/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
            released: "2016-11-14T01:48:57Z",
            updated: "2023-08-15T12:29:14Z"
        },
        {
            app_id: 'com.mcpetools.mapsmaster',
            title: "Modern Houses for Minecraft PE",
            price: 5.22,
            url: "https://apps.apple.com/us/app/modern-houses-for-minecraft-pe/id1589499212?uo=4",
            icon: "https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/7f/24/b0/7f24b0f7-a665-fb8f-fc7d-85af6fb4bc5a/AppIcon-0-0-1x_U007emarketing-0-0-0-5-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/512x512bb.jpg",
            released: "2016-11-14T01:48:57Z",
            updated: "2023-08-15T12:29:14Z"
        }
    ]

}
const { handleSubmit, handleReset } = useForm({
    validationSchema: {
        username(value: string) {
            if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

            return 'Must be a valid e-mail.'
        },
        password(value: string) {
            if (value) return true

            return 'Name needs to be at least 2 characters.'
        }
    },
})

const submit = handleSubmit((values: { username: any; password: any; }) => {

})

</script>
<template>
    <form @submit.prevent="submit">
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
        <v-container fluid>
            <v-data-table v-model:items-per-page="dataTable.itemsPerPage" :headers="dataTable.headers"
                :items="dataTable.items" item-value="title" class="elevation-1">
                <template v-slot:item.icon="{ item }">
            <div class="p-2">
              <v-img :src="item.icon" :alt="item.title" height="32px"></v-img>
            </div>
          </template>
            </v-data-table>
        </v-container>
    </form>
</template>
<script setup lang="ts">

    import { ref } from 'vue';
    const dialog = ref(false);
    const resolve = ref(false);
    const reject = ref(false);
    const message = ref('');
    const title = ref('');
    const options = ref({
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false,
    });

    interface Props {
        title: string
        message: string
    }

    const props = defineProps<Props>()

    const open = () => {
        dialog.value = true;
        title.value = props.title;
        message.value = props.message;
        options.value = Object.assign(options.value, options);
        return new Promise((resolve, reject) => {
            resolve = resolve;
            reject = reject;
        })
    }

    const agree = () => {
          resolve.value = true;
          dialog.value = false;
    }

    const cancel = () => {
        resolve.value = false;
        dialog.value = false;
    }

  </script>
<template>
    <v-dialog
      v-model="dialog"
      :max-width="options.width"
      :style="{ zIndex: options.zIndex }"
      @keydown.esc="cancel"
    >
      <v-card>
        <v-toolbar dark :color="options.color" dense flat>
          <v-toolbar-title class="text-body-2 font-weight-bold grey--text">
            {{ title }}
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text
          v-show="!!message"
          class="pa-4 black--text"
          v-html="message"
        ></v-card-text>
        <v-card-actions class="pt-3">
          <v-spacer></v-spacer>
          <v-btn
            v-if="!options.noconfirm"
            color="grey"

            class="body-2 font-weight-bold"
            @click.native="cancel"
            >Cancel</v-btn
          >
          <v-btn
            color="primary"
            class="body-2 font-weight-bold"
            outlined
            @click.native="agree"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  
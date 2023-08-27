<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth.store';
const authStore = useAuthStore();    
</script>

<template>
  <v-app id="app-scraper">
    <v-navigation-drawer model-value class="pt-4" color="grey-darken-3" rail permanent>
      <img src="@/assets/img/logo.png" height="32" class="d-block text-center mx-auto mb-9">
      <v-avatar class="d-block text-center mx-auto mb-9" color="grey-darken-1" size="32"
        :image="authStore.user.image_url"></v-avatar>
      <router-link to="/" class="navbar-link">
        <v-btn size="small" class="d-block text-center mx-auto" density="comfortable" icon="mdi-home"
          variant="text"></v-btn>
      </router-link>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<style>
.navbar-link {
  text-decoration: none !important;
  color: #fff;
}
</style>
<script setup lang="ts">

import { useAuthStore } from '../stores/auth.store';
const authStore = useAuthStore();

const { isAuthenticated } = authStore;
if (authStore.isAuthenticated === true) {
  const { user } = authStore.user;
}

const user = authStore.user

const logout = () => {
  authStore.logout();
}

const links = [
  'Messages',
  'Profile',
  'Updates',
]

const menuItems = [
  { text: 'Settings', icon: 'mdi-cogs' },
  { text: 'Profile', icon: 'mdi-account-box' },
  { text: 'Sign Out', icon: 'mdi-logout-variant'},
]
</script>
<template>
  <v-app id="recogniz">
    <v-app-bar flat>
      <v-container class="mx-auto d-flex align-center justify-center">
        <!-- <v-avatar class="me-4 " color="grey-darken-1" size="32" image="@/assets/img/recogniz-logo.png"></v-avatar> -->
        <img src="@/assets/img/recogniz-logo.png" height="32" class="mr-3">
        <v-btn class="text-capitalize" v-for="link in links" :key="link" :text="link" variant="text"></v-btn>
        <v-spacer></v-spacer>
        <v-responsive max-width="280">
          <v-text-field density="compact" flat hide-details label="Search" rounded="lg" single-line
            variant="solo-filled"></v-text-field>
        </v-responsive>
        <v-menu min-width="200px" rounded>
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" class="ml-4">
              <v-avatar class="me-4 ml-4" color="grey-darken-1" size="32"
          image="https://xsgames.co/randomusers/avatar.php?g=male"></v-avatar> 
            </v-btn>
          </template>
          <v-list density="compact">
            <v-list-item value="1">
              <template v-slot:prepend>
                <v-icon icon="mdi-cogs" style="margin-right: -15px"></v-icon>
              </template>
              <v-list-item-title text="Settings">Settings</v-list-item-title>
            </v-list-item>
            <v-list-item value="2" @click="logout">
              <template v-slot:prepend>
                <v-icon icon="mdi-logout-variant" style="margin-right: -15px"></v-icon>
              </template>
              <v-list-item-title text="Sign Out">Logout</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-darken-3">
      <router-view />
    </v-main>
  </v-app>
</template>




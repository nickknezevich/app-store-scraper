<script setup lang="ts">
import { Form, Field, useField, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';

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
const username = useField('username')
const password = useField('password')
const validationError = ref()

const submit = handleSubmit((values: { username: any; password: any; }) => {
    const authStore = useAuthStore();
    const { username, password } = values;

    return authStore.login(username, password)
        .catch(error => {
           validationError.value = error.response.data.errors.message;
        });
})
</script>

<template>
    <main class="d-flex w-100">
        <div class="container d-flex flex-column">
            <div class="row vh-100">
                <div class="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                    <div class="d-table-cell align-middle">

                        <div class="text-center mt-4">
                            <img src="@/assets/img/logo-larger.png" height="32" class="mb-3">
                            <p class="lead">
                                Sign in to your account to continue
                            </p>
                        </div>
                        <v-card class="mx-auto login-form" max-width="344">
                                <div class="m-sm-3">
                                    <form @submit.prevent="submit">
                                        <v-text-field v-model="username.value.value" variant="outlined"
                                            :error-messages="username.errorMessage.value" label="Email"
                                            class="mb-2"></v-text-field>

                                        <v-text-field v-model="password.value.value"
                                            :error-messages="password.errorMessage.value" label="Password"
                                            variant="outlined" class="mb-2"></v-text-field>


                                        <button class="w-100 btn btn-lg btn-success">
                                            
                                            Login
                                        </button>
                                        <div class="mt-3 text-error" color="text-error" v-show="validationError">{{ validationError }}</div>
                                    </form>
                                </div>
                            
                        </v-card>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style>
.form-signin {
    max-width: 330px;
    padding: 15px;
}

.w-100 {
    width: 100% !important;
}
</style>
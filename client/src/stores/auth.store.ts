import { defineStore } from 'pinia';

import { connector } from '@/services/connector';
import router from '../router';

type User = {
    id: number
    email: string
    first_name: string
    last_name: string
    full_name: string
    image_url: string
}

type State = {
    user: User | null
    isAuthenticated: boolean
    returnUrl: string
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): State => ({
        // initialize state from local storage to enable user to stay logged in
        user: JSON.parse(localStorage.getItem('user') as string),
        isAuthenticated: false,
        returnUrl: ''
    }),
    actions: {
        async login(username: string, password: string): Promise<void> {
            const authData = await connector.post(`/api/auth/login`, { username, password });
            console.log("AUTH DATA", authData)
            // update pinia state
            this.user = authData.data.data;
            this.isAuthenticated = true;
            // store user details and jwt in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(this.user));

            // redirect to previous url or default to home page
            //router.push(this.returnUrl || '/');
            window.location.href = this.returnUrl || '/'
        },
        async logout(): Promise<void> {
            this.user = null;
            this.isAuthenticated = false;
            localStorage.removeItem('user');
            router.go('login' as any)
            //router.push('login');
            //window.location.href = '/login'
        }
    }
});
import { defineStore } from 'pinia';

import { connector } from '@/services/connector';
const user = JSON.parse(localStorage.getItem('user') as string);

type State = {
    chatGPTresponse: Completion | null
    message: string
    isLoading: boolean
    isCompleted: boolean
    errors: object | null
}

export type CompletionChoice = {
    index: number
    message: {
        role: string
        content: string
    }
    finish_reason: string
}
export type Completion = {
    id: number
    object: string
    created: string
    model: string
    choices: CompletionChoice[]
}

export const useChatGptStore = defineStore({
    id: 'completions',
    state: (): State => ({
        chatGPTresponse: null,
        isLoading: false,
        isCompleted: false,
        message: '',
        errors: null
    }),
    actions: {
        async getFeedback(question: object) {
            this.isLoading = true;
            this.message = 'Loading data';
            connector.post('/api/chat-gpt/completion', {
                question: JSON.stringify(question),
                model: "gpt-3.5-turbo",
                temperature: 0.9
            }, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(response => 
                    this.message = response.data.data.choices[0].message.content
                )
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isCompleted = false;
                })
        }
    }
})
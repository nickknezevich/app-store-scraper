import { defineStore } from 'pinia';

import { connector } from '@/services/connector';
const user = JSON.parse(localStorage.getItem('user') as string);

type State = {
    posts: Post[] | null
    post: Post | null
    isLoading: boolean
    errors: object | null
}

export type PostRecipient = {
    id: number
    post_id: number
    recipient_id: number
    recipient: {
        id: number
        full_name: string
    }
}

export type PostComment = {
    id: number
    body: string
    owner_id: number
    owner: {
        id: number
        email: string
        first_name: string
        last_name: string
        full_name: string
        image_url: string
    }
    created_at: string
    updated_at: string
}

export type PostLike = {
    id: number
    body: string
    owner_id: number
    owner: {
        id: number
        email: string
        first_name: string
        last_name: string
        full_name: string
        image_url: string
    }
    created_at: string
    updated_at: string
}

export type Post = {
    id: number
    type: number
    owner_id: number
    title: string
    body: string
    image_uuid: string
    created_at: string
    updated_at: string
    owner: {
        id: number
        email: string
        first_name: string
        last_name: string
        full_name: string
        image_url: string
    },
    post_comments: PostComment[]
    post_likes: PostLike[]
    post_recipients: PostRecipient[]
    _count: {
        post_comments: number
        post_likes: number
        post_boosts: number
    }
}

export type PostsFilter = {
    page: number
    num_per_page: number
}

export const usePostsStore = defineStore({
    id: 'posts',
    state: (): State => ({
        posts: [],
        post: null,
        isLoading: false,
        errors: null
    }),
    actions: {
        async getPosts(filter: PostsFilter) {
            this.isLoading = true;
            connector.get('/api/posts', {
                params: filter,
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(posts => this.posts = posts.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoading = false;
                })
        },
        async getPostById(id: number) {
            this.isLoading = true;
            connector.get(`/api/posts/${id}`, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(post => this.post = post.data.data)
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoading = false;
                })
        },
        async addComment(postId: number, body: string): Promise<unknown> {
            this.isLoading = true;
            return connector.post(`/api/posts/${postId}/comments`, {
                body
            }, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(response => {
                    return response;
                })
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoading = false;
                })
        },
        async manageLikeUnlike(postId: number) {
            this.isLoading = true;
            connector.post(`/api/posts/${postId}/likes`, null, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`
                }
            })
                .then(response => {
                    //this.posts?.filter(post => post.id === response.data.data.post.id)
                    let updatedPostIndex = this.posts?.findIndex(post => post.id === postId);

                    if (updatedPostIndex !== -1) {
                        // Update the post object with the new data from the response
                        this.posts ? [updatedPostIndex] : response.data.data.post
                    }
                })
                .catch(error => this.errors = error)
                .finally(() => {
                    this.isLoading = false;
                })

        }
    }
});
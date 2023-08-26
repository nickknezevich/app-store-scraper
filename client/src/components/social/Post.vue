<script setup lang="ts">
import Comments from './Comments.vue'
import { onMounted, ref, toRef } from 'vue'
import { coreApiUrl } from '../../services/connector'
import { Post, PostComment, PostRecipient, usePostsStore } from '../../stores/posts.store';
import moment from 'moment';
import { useAuthStore } from '../../stores/auth.store';
import { connector } from '../../services/connector';
import { provide } from 'vue'

const user = JSON.parse(localStorage.getItem('user') as string);
const authStore = useAuthStore()
const postsStore = usePostsStore();

interface Props {
    post: Post
}

const props = defineProps<Props>()

const imageSrc = `${coreApiUrl}/api/images/`

const showComment = ref(false)
const showComments = ref(false)
const loading = ref(false)
const liked = ref(false)
const boosted = ref(false)
const newComment = ref('')

provide("post_object", props.post);

const addComment = () => {

    if (newComment.value !== '') {
        loading.value = true;
        // postsStore.addComment(props.post.id, newComment.value).then(response => {
        //     console.log("ADD COMMENT RESPONSE", response)


        //     newComment.value = ""
        //     loading.value = false;
        // }).catch(() => {
        //     loading.value = false;
        // })

        connector.post(`/api/posts/${props.post.id}/comments`, {
            body: newComment.value
        }, {
            headers: {
                Authorization: `Bearer ${user.access_token}`
            }
        })
            .then(response => {
                props.post.post_comments.unshift(response.data.data)
                newComment.value = '';
                showComments.value = true
            })
            .catch(error => { })
            .finally(() => {
                loading.value = false
                showComment.value = false;
            })
    }
}

const like = () => {
    postsStore.manageLikeUnlike(props.post.id).then(() => {
        liked.value = !liked.value
        if (liked.value === true) {
            props.post._count.post_likes++
        } else {
            props.post._count.post_likes--
        }

    })

}

const boost = () => {
    boosted.value = !boosted.value
}

onMounted(() => {
    const currentUser = authStore.user;
    const isLiked = props.post.post_likes.filter(postLike => postLike.owner.id === currentUser?.id)
    liked.value = isLiked.length === 1 ? true : false;
})

</script>
<template>
    <v-card class="mb-4 pt-2">
        <span class="float-right mt-3 mr-3 text-caption text--darken-4" color="light-blue-lighten-3"
            style="color: #4e4e4d">{{ moment(post.updated_at).fromNow() }}</span>
        <v-card-title class="text-white"><v-avatar class="me-2" color="grey-darken-1" size="32"
                :image="post.owner.image_url"></v-avatar>
            <span class="mt-3 mr-3 text-caption text--darken-4"><a href="" class="post-author">{{ post.owner.full_name
            }}</a></span>
            <div class="mt-3"><router-link to="/" class="text-decoration-none post-title">{{ post.title }}</router-link>
            </div>
        </v-card-title>
        <v-card-text class="mb-0" style="word-break: break-word">{{ post.body }} </v-card-text>
        <v-card-subtitle class="text-white mb-3" v-show="post.post_recipients">
            <a v-for="recipient in post.post_recipients" :key="recipient.id" class="mr-1 post-recipient">{{
                recipient.recipient.full_name }}</a>
        </v-card-subtitle>
        <v-img :src="imageSrc + post.image_uuid" class="align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="400px" cover></v-img>
        <v-card-actions>
            <v-btn size="small" v-bind:color="liked === true ? 'red' : 'surface-variant'" variant="text" icon="mdi-heart"
                @click="like"></v-btn><span class="text-caption">{{ post._count.post_likes }}</span>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-comment"
                @click="showComment = !showComment"></v-btn>
            <v-btn v-if="post.type === 1" size="small" v-bind:color="boosted === true ? 'orange' : 'surface-variant'"
                variant="text" icon="mdi-rocket-launch" @click="boost"></v-btn>
            <v-btn size="small" color="surface-variant" variant="text" icon="mdi-share-variant"></v-btn>
            <v-spacer></v-spacer>
            <span class="float-right mr-3 text-caption text--darken-4"><a href="#" color="text-light-blue-lighten-3"
                    class="comments-link" @click="showComments = !showComments">{{ post.post_comments.length }} {{
                        post.post_comments.length === 1 ? 'comment' : 'comments' }}</a></span>
        </v-card-actions>
        <v-fade-transition>
            <v-textarea v-show="showComment" :loading="loading" append-inner-icon="mdi-comment-text" variant="solo"
                no-resize auto-grow class="mx-2 mb-2" label="Add comment" rows="1" hide-details
                @click:append-inner="addComment" v-model="newComment"></v-textarea>
        </v-fade-transition>
        <div v-show="showComments">
            <Comments :post-comments="post.post_comments" />
        </div>
    </v-card>
</template>

<style>
.v-text-field>.v-input__control>.v-input__slot:before {
    border-style: none;
}
</style>
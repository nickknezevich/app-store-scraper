<script setup lang="ts">

import moment from 'moment';
import { inject } from 'vue';
import { connector } from '@/services/connector';
import type { Post } from '@/stores/posts.store';
import Confirm  from '../../components/Confirm.vue'
const user = JSON.parse(localStorage.getItem('user') as string);


const props = defineProps({
    commentId: Number,
    author: String,
    avatarSrc: String,
    text: String,
    dateTime: String
})

const post = inject("post_object") as Post;

const deleteComment = () => {
    console.log('Click delete')
    connector.delete(`/api/posts/${post.id}/comments/${props.commentId}`, {
        headers: {
            Authorization: `Bearer ${user.access_token}`
        }
    })
        .then(response => {
            if (response.data.message === 'Success') {
                console.log('deleting comment')
                const objWithIdIndex = post.post_comments.findIndex((comment) => comment.id === props.commentId);

                if (objWithIdIndex > -1) {
                    post.post_comments.splice(objWithIdIndex, 1);
                }
            }
        })
        .catch(error => { })
}
</script>
<template>
    <v-sheet class="pl-4 pr-4 pb-4 mb-1 post-comment">
        <div class="post-comment-wrapper">
            <span class="float-right delete-comment"><v-btn size="small" style="color: #fff" class="delete-comment"
                    variant="text" icon="mdi-delete" @click="deleteComment"></v-btn> </span>
            <div class="mb-2 text-subtitle-2"><router-link to="/" class="comment-link"><v-avatar :image="avatarSrc"
                        class="me-2" color="grey-darken-1" size="32"></v-avatar>{{ author }}</router-link><span
                    class="mt-1 ml-3 text-caption text--darken-4" color="light-blue-lighten-3" style="color: #616161">{{
                        moment(dateTime).fromNow() }}</span></div>
            <div class="text-grey-lighten-2">{{ text }}</div>

        </div>
    </v-sheet>
    <Confirm title="Delete Comment" message="Would you like to delete comment?"/>
</template>

<style>
.delete-comment {
    display: none;
}

.post-comment-wrapper:hover .delete-comment {
    display: inline-table;
}
</style>../Confirm.vue
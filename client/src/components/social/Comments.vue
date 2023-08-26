<script setup lang="ts">
import { PostComment } from '../../stores/posts.store';
import Comment from './Comment.vue'

interface Props {
  postComments: PostComment[]
}

const props = defineProps<Props>()

</script>
<template>
    <Comment v-for="comment in postComments" :key="comment.id" 
        :author="comment.owner.full_name"
        :text="comment.body"
        :avatar-src="comment.owner.image_url"
        :date-time="comment.updated_at"
        :comment-id="comment.id"
    />
</template>
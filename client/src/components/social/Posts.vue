<script async setup lang="ts">
import { storeToRefs } from 'pinia';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import router from '../../router';
import Post from '../../components/social/Post.vue'
import { usePostsStore } from '../../stores/posts.store';
const postsStore = usePostsStore();

const initialFilterValues = {
  page: 1, num_per_page: 10
}
const route = useRoute()
router.push({ path: 'posts', query: initialFilterValues })

const { posts, isLoading, errors } = storeToRefs(postsStore);

onMounted(async () => {
  await postsStore.getPosts({ page: Number(route.query.page) || 1, num_per_page: 10 });
  console.log("Mounted", true)
});

</script>
<template>
  <Post v-for="post in posts" :key="post.id" :post="post"/>
</template>./Post.vue
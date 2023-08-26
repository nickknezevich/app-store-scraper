
<script setup lang="ts">
import Profile from '../components/social/Profile.vue'
import Post from '../components/social/Post.vue'
import Posts from '../components/social/Posts.vue'

</script>
<template>
	<v-container>
		<v-row>
			<v-col cols="3">
				<Profile image-src="https://xsgames.co/randomusers/avatar.php?g=male" full-name="Nikola Knezevic"
					occupation="Lead Software Engineer" company="L7 Informatics" />
			</v-col>
			<v-col cols="6">
				<Posts />
			</v-col>
			<v-col cols="3">
			</v-col>
		</v-row>
	</v-container>
</template>
  
<style>
body {
	height: 100vh;
}
</style>
  

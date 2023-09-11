<template>
  <section class="featured-posts">
      <post-preview
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :is-admin="isAdmin"
        :title="post.title"
        :previewText="post.previewText"
        :url="post.thumbnail"
      />      
    </section>
</template>

<script>
import PostPreview from "@/components/Posts/PostPreview.vue";

export default {
  components: {
    PostPreview
  }, 
  props: {
    isAdmin: {
      type: Boolean,
      default: false
    },
    posts: {
      type: Array
    }
  }
}
</script>

<style scoped>
.featured-posts {
  display: flex;
  padding:20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
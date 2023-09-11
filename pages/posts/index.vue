<template>
  <div class="posts-page">
    <post-list :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  computed: {
    loadedPosts() {
      //   console.log("loaded post", this.$store.getters.loadedPost);
      return this.$store.getters.loadedPost;
    },
  },
};
</script>

<style scoped>
.posts-page {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<template>
  <div class="admin-page">
    <section class="new-post">
      <AppButton
        @click="$router.push('/admin/new-post')"
        btn-style="Create Post"
        >Create Post
      </AppButton>
      <AppButton @click="logout">Logout </AppButton>
    </section>
    <section class="existing-posts">
      <h1>Existing Posts</h1>
      <post-list :posts="loadedPosts" isAdmin />
    </section>
  </div>
</template>

<script>
export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  computed: {
    loadedPosts() {
      // console.log("Loaded posts: ", this.$store.getters.loadedPost);
      return this.$store.getters.loadedPost;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/admin/auth");
    },
  },
};
</script>

<style scoped>
.admin-page {
  padding: 20px;
}
.new-post {
  text-align: center;
  border-bottom: 2px solid #ccc;
  padding-bottom: 10px;
}
.existing-posts h1 {
  text-align: center;
}
</style>

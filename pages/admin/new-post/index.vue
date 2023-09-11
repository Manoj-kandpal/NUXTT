<template>
  <div class="admin-new-post-page">
    <section class="new-post-form">
      <AdminPostForm @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import axios from "axios";
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
export default {
  layout: "admin",
  components: {
    AdminPostForm,
  },
  middleware: ["check-auth", "auth"],
  methods: {
    onSubmit(post) {
      this.$store
        .dispatch("addPost", post)
        .then((res) => this.$router.push("/admin"));
    },
  },
};
</script>

<style scoped>
.new-post-form {
  width: 90%;
  margin: 20px auto;
}
@media (min-width: 768px) {
  .new-post-form {
    width: 500px;
  }
}
</style>

<template>
  <div class="admin-post-page">
    <section class="update-form">
      <AdminPostForm :post="loadedPost" @submit="onSubmit" />
    </section>
  </div>
</template>

<script>
import AdminPostForm from "@/components/Admin/AdminPostForm.vue";
import axios from "axios";
export default {
  layout: "admin",
  middleware: ["check-auth", "auth"],
  components: {
    AdminPostForm,
  },
  asyncData(context) {
    // console.log("context ", context);
    return axios
      .get(
        "https://nuxt-3dc38-default-rtdb.firebaseio.com/posts/" +
          context.params.postId +
          ".json"
      )
      .then((res) => {
        return { loadedPost: { ...res.data, id: context.params.postId } };
      })
      .catch((e) => context.error(e));
  },
  methods: {
    onSubmit(editedPost) {
      this.$store
        .dispatch("editPost", editedPost)
        .then(() => this.$router.push("/admin"));
    },
  },
  // data() {
  //   return {
  //     loadedPost: {
  //       author: "Manoj",
  //       title: "My title",
  //       content: "aswesome content of mine",
  //       thumbnail:
  //         "https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1.png",
  //     },
  //   };
  // },
};
</script>

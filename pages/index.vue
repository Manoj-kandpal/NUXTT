<template>
  <div class="home-page">
    <section class="intro">
      <h1>Get the latest tech news!</h1>
    </section>
    <post-list :posts="loadedPosts" />
  </div>
</template>

<script>
export default {
  name: "HomePage",
  // asyncData(context, callback) {
  //   setTimeout(()=> {
  //     callback(null, {
  //       loadedPosts : [
  //       {
  //         id:"1",
  //         title:"First Post",
  //         previewText:"This is the first post",
  //         thumbnail:'https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1.png'
  //       },
  //       {
  //         id:"2",
  //         title:"second Post",
  //         previewText:"This is the second post",
  //         thumbnail:'https://www.womenintech.co.uk/wp-content/uploads/2021/11/Tech-skills-2022-1.png'
  //       },
  //     ]
  //     })

  //   }, 1500);
  // },
  computed: {
    loadedPosts() {
      return this.$store.getters.loadedPost;
    },
  },
  // data() {
  //   return {
  //     loadedPosts: []
  //   }
  // }
};
</script>

<style scoped>
.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-position: center;
  background-size: cover;
  background-image: url("~/assets/images/background_image.jpg");
}
.intro h1 {
  position: absolute;
  top: 10%;
  left: 5%;
  width: 90%;
  font-size: 1.5rem;
  color: black;
  background-color: rgb(211, 211, 211);
  padding: 10px;
  border-radius: 10px;
  box-shadow: 3px 3px 3px black;
  box-sizing: border-box;
  border: 1px solid black;
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
  }
}
</style>

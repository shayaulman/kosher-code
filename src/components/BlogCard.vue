<template>
  <div class="blog-card">
    <img class="img" :src="logo" />
    <h1>{{name}}</h1>
    <h3>{{author}}</h3>
    <p>{{desc}}</p>
  </div>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    name: String,
    desc: String,
    author: String,
    logo: String,
  },
};
</script>

<style lang="scss" scoped>
.blog-card {

}
.img
</style>
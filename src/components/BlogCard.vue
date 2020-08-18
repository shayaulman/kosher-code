<template>
  <g-link
    :style="`background:${color}`"
    :class="{'bg-custom-bg-card-2 text-custom-text-secondary': isMedium}"
    class="m-2 py-2 px-6 text-center text-white text-lg rounded-md transform hover:scale-105 transition ease-in duration-200"
    :to="link"
  >
    <h1 class="text-lg" dir="auto">{{name}}</h1>
    <p class="text-xs font-light opacity-75" dir="auto">{{desc}}</p>
  </g-link>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    name: String,
    desc: String,
    link: String,
    color: String,
    isMedium: Boolean,
  },
};
</script>

<style lang="scss" scoped>
</style>
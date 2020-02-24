<template>
  <section>
    <g-link
      :to="link"
      :class="{ 'router-link-active': subIsActive('/video-tutorials') }"
      class="mx-3 text-custom-text-primary font-hairline opacity-75 hover:text-custom-brand transition duration-300"
      :v-smooth-scroll="link === 'video-tutorials'"
      >{{ item }}</g-link
    >
  </section>
</template>

<script>
export default {
  props: {
    item: String,
    link: String
  },

  methods: {
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    }
  }
};
</script>

<style lang="postcss" scoped>
.active--exact {
  @apply text-custom-brand;
}
</style>

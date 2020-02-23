<template>
  <section>
    <g-link
      :to="link"
      class="mx-3 text-custom-text-primary font-hairline opacity-75 hover:text-custom-brand transition duration-300"
      :v-smooth-scroll="link === '#video-tutorials'"
      >{{ item }}</g-link
    >
  </section>
</template>

<script>
export default {
  props: {
    item: String,
    link: String
  }
};
</script>

<style lang="postcss" scoped>
.active--exact {
  @apply text-custom-brand;
}
</style>

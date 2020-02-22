<template>
  <section>
    <g-link
      :to="link"
      class="mx-3 text-custom-text-primary font-hairline hover:text-custom-brand transition duration-300"
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

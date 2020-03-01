<template>
  <section
    class="w-72 m-3 rounded-md bg-custom-bg-card transform hover:-translate-y-1 ease-in duration-100"
  >
    booooo
    <h1>{{ name }}</h1>
    <h3>{{ amountOfVideos }}</h3>
  </section>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    amountOfVideos: Number
  }
};
</script>

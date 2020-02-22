<template>
  <section class="p-4 w-full absolute bottom-0 flex justify-around">
    <!-- <github-icon /> -->
    <a
      class="text-sm text-custom-text-primary font-thin"
      href="https://github.com/shayaulman"
      >GitHub</a
    >
    <p class="text-sm text-custom-text-primary font-thin">
      &copy; 2020 shayaulman
    </p>
    <a
      href="mailto:shayaulman@gmail.com"
      class="text-sm text-custom-text-primary font-thin"
      >shayaulman</a
    >
  </section>
</template>

<script>
import GithubIcon from "~/components/UI/GithubIcon.vue";
export default {
  components: { GithubIcon }
};
</script>

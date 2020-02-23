<template>
  <section class="py-4 absolute bottom-0 flex justify-around">
    <a href="https://github.com/shayaulman" class="h-6 w-6">
      <app-icon class="hover:text-custom-text-brand" :icon="'github'" />
    </a>

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
import AppIcon from "~/components/UI/AppIcon";
export default {
  components: { AppIcon }
};
</script>

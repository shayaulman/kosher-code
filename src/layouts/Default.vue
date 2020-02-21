<template>
  <div class="theme-dark min-h-screen bg-custom-bg-primary">
    <app-header />

    <div class="max-w-6xl m-auto p-8">
      <slot />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader";
export default {
  components: {
    AppHeader
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>

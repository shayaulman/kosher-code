<template>
  <div
    class="theme-dark min-h-screen bg-custom-bg-primary border-t-4 border-custom-green-1"
  >
    <app-header />

    <div class="max-w-6xl m-auto">
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
  font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  margin: 0;
  padding: 0;
  line-height: 1.5;
}
</style>

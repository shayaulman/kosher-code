<template>
  <div
    :class="theme"
    class="background-wrapper relative min-h-screen bg-custom-bg-primary transition duration-200"
  >
    <div class="header-bar"></div>
    <app-header />

    <div class="max-w-6xl mx-auto pb-24">
      <slot />
      <app-footer />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";
export default {
  components: {
    AppHeader,
    AppFooter
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    }
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.header-bar {
  background: linear-gradient(90deg, #d32e9d, #8ed6fb 50%, #00835c);
  padding: 2px;
  text-align: center;
  color: #fff;
  font-size: 1rem;
}
</style>

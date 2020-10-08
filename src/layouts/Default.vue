<template>
  <div
    :class="theme"
    class="relative min-h-screen bg-custom-bg-primary transition duration-200"
  >
    <div class="header-bar"></div>
    <app-header />
    <div class="relative max-w-screen-xl min-h-screen mx-auto mt-12 pb-24">
      <h1>{{ title }}</h1>
      <h2>{{ subTitle }}</h2>
      <slot />
      <app-footer v-if="!dontShowFooter" />
    </div>
  </div>
</template>

<script>
import AppHeader from "~/components/AppHeader";
import AppFooter from "~/components/AppFooter";
export default {
  props: {
    title: String,
    subTitle: String,
    dontShowFooter: Boolean,
  },
  components: {
    AppHeader,
    AppFooter,
  },

  computed: {
    theme() {
      return this.$store.state.theme;
    },
  },
  methods: {
    listenerSetup(selector) {
      if (!selector) {
        return console.error("bmc-button not found!");
      }
      selector.addEventListener("click", () => {
        this.$gtag.pageview("buy-me-a-coffee");
      });
    },
  },
  mounted() {
    setTimeout(() => {
      const bmcBtn = document.getElementById("bmc-wbtn");
      this.listenerSetup(bmcBtn);
    }, 500);
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  line-height: 1.5;
}

.header-bar {
  background: linear-gradient(90deg, #ea3e78, #8ed6fb 50%, #00835c);
  padding: 2px;
  text-align: center;
  color: #fff;
  font-size: 1rem;
}
</style>

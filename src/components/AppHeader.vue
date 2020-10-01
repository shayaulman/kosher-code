<template>
  <header
    class="max-w-6xl mx-auto py-6 px-12 flex justify-between items-center"
  >
    <g-link to="/" class="text-xl text-center text-white font-thin">
      <app-logo />
    </g-link>
    <div class="flex items-center">
      <nav-item
        v-for="(item, i) in navItems"
        :key="i"
        :item="item.item"
        :link="item.link"
      />
    </div>
    <a
      class="bmc-button bg-custom-bg-card text-custom-text-primary"
      target="_blank"
      href="https://www.buymeacoffee.com/shayaulman"
      @click="track"
      ><img
        src="https://www.buymeacoffee.com/assets/img/BMC-btn-logo.svg"
        alt="Buy me a coffee"
      /><span style="margin-left: 5px">Buy me a coffee</span></a
    >
    <div>
      <theme-toggle />
    </div>
  </header>
</template>

<script>
import NavItem from "~/components/NavItem";
import ThemeToggle from "~/components/UI/ThemeToggle";
import AppLogo from "~/components/UI/AppLogo";
export default {
  components: { NavItem, ThemeToggle, AppLogo },
  data() {
    return {
      navItems: [
        { item: "בית", link: "/" },
        { item: "סרטוני הדרכה", link: "/#video-tutorials" },
        { item: "בלוגים", link: "/blogs" },
        { item: "פודקאסטים", link: "/podcasts" },
        { item: "Reddit", link: "/reddit" },
        {
          item: "אודות",
          link:
            "https://www.prog.co.il/threads/%D7%9E%D7%AA%D7%9B%D7%A0%D7%AA%D7%99%D7%9D-%D7%9E%D7%90%D7%92%D7%A8-%D7%9E%D7%99%D7%95%D7%97%D7%93-%D7%9C%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%9C%D7%9E%D7%99%D7%93%D7%94.523947/",
        },
      ],
    };
  },
  methods: {
    track() {
      console.log(this.$analytics.trackEvent);
      this.$analytics.trackEvent("Buy Me A Coffee", "Click");
    },
  },
};
</script>

<style lang="scss" scoped>
.bmc-button img {
  width: 27px !important;
  margin-bottom: 1px !important;
  box-shadow: none !important;
  border: none !important;
  vertical-align: middle !important;
}

.bmc-button {
  line-height: 36px !important;
  text-decoration: none !important;
  display: inline-flex !important;
  border-radius: 8px !important;
  margin: 0 6px;
  padding: 4px 12px !important;
  font-size: 20px !important;
  letter-spacing: 0.6px !important;
  font-family: "Cookie", cursive !important;
  -webkit-box-sizing: border-box !important;
  box-sizing: border-box !important;
  -o-transition: 0.3s all linear !important;
  -webkit-transition: 0.3s all linear !important;
  -moz-transition: 0.3s all linear !important;
  -ms-transition: 0.3s all linear !important;
  transition: 0.3s all linear !important;

  img {
    margin-left: 8px;
  }
}

.bmc-button:hover,
.bmc-button:active,
.bmc-button:focus {
  -webkit-box-shadow: 0 0 0 0.2rem #ea3e777c !important;
  text-decoration: none !important;
  color: #ea3e78;
  box-shadow: 0 0 0 0.2rem #ea3e776c !important;
  opacity: 0.85 !important;
}
</style>

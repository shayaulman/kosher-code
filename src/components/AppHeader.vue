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
        { item: "לימודים", link: "/learning-platforms" },
        {
          item: "אודות",
          link:
            "https://www.prog.co.il/threads/%D7%9E%D7%AA%D7%9B%D7%A0%D7%AA%D7%99%D7%9D-%D7%9E%D7%90%D7%92%D7%A8-%D7%9E%D7%99%D7%95%D7%97%D7%93-%D7%9C%D7%97%D7%95%D7%9E%D7%A8%D7%99-%D7%9C%D7%9E%D7%99%D7%93%D7%94.523947/",
        },
      ],
    };
  },
};
</script>

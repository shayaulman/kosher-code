<template>
  <header
    class="max-w-6xl mx-auto py-6 px-12 flex justify-between items-center"
  >
    <g-link to="/" class="text-xl text-center text-white font-thin">
      <app-logo />
    </g-link>
    <div class="flex">
      <nav-item
        v-for="(item, i) in navItems"
        :key="i"
        :item="item.item"
        :link="item.link"
      />
    </div>
    <div><theme-toggle /></div>
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
        { item: "Reddit", link: "/reddit" }
      ]
    };
  }
};
</script>

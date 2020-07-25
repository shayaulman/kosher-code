// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from "vuex";
import DefaultLayout from "~/layouts/Default.vue";
import "~/assets/tailwind.css";
import "~/assets/global.css";
import vueSmoothScroll from "vue-smooth-scroll";
import InfiniteLoading from "vue-infinite-loading";

export default function(Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(router);
  Vue.use(Vuex);
  Vue.use(vueSmoothScroll);
  Vue.use(InfiniteLoading);

  if (process.isClient) {
    const Paginate = require("vuejs-paginate");

    Vue.component("Paginate", Paginate);
  }

  appOptions.store = new Vuex.Store({
    state: {
      theme: getTheme(),
    },
    mutations: {
      toggleTheme(state) {
        state.theme =
          state.theme === "theme-dark" ? "theme-light" : "theme-dark";
        localStorage.setItem("theme", state.theme);
      },
    },
  });
}

function getTheme() {
  if (process.isClient) {
    return localStorage.getItem("theme") || "theme-dark";
  }
}

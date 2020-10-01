// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from "vuex";
import VueGtag from "vue-gtag";

import DefaultLayout from "~/layouts/Default.vue";
import "~/assets/tailwind.css";
import "~/assets/global.scss";
import vueSmoothScroll from "vue-smooth-scroll";
import InfiniteLoading from "vue-infinite-loading";

export default function(Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.use(router);
  Vue.use(Vuex);
  Vue.use(vueSmoothScroll);
  Vue.use(InfiniteLoading);

  Vue.filter("number", (value) =>
    isNaN(value) ? "" : Number(value).toLocaleString("en")
  );

  if (process.isClient) {
    const Paginate = require("vuejs-paginate");

    Vue.component("Paginate", Paginate);
    Vue.use(
      VueGtag,
      {
        config: { id: "UA-153721766-1" },
      },
      router
    );

    router.beforeEach((to, from, next) => {
      console.log(`${to.path}/`);
      // Vue.analytics.trackView(`דג`);
      next();
    });
  }

  appOptions.store = new Vuex.Store({
    state: {
      theme: getTheme(),
    },
    mutations: {
      TOGGLE_THEME(state) {
        state.theme =
          state.theme === "theme-dark" ? "theme-light" : "theme-dark";
        if (process.isClient) {
          localStorage.setItem("theme", state.theme);
        }
      },
      SET_THEME(state) {
        state.theme = getTheme();
      },
    },
  });
}

function getTheme() {
  if (process.isClient) {
    return localStorage.getItem("theme") || "theme-dark";
  }
  return "theme-dark";
}

// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api
import Vuex from "vuex";
import VueAnalytics from "vue-ua";
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
  Vue.use(VueAnalytics, {
    // [Required] The name of your app as specified in Google Analytics.
    appName: "kosherCode",
    // [Required] The version of your app.
    appVersion: "1.0.0",
    // [Required] Your Google Analytics tracking ID.
    trackingId: "UA-153721766-1",
    // If you're using vue-router, pass the router instance here.
    // vueRouter: router,

    // Global Dimensions and Metrics can optionally be specified.
    // globalDimensions: [
    //   { dimension: 1, value: 'FirstDimension' },
    //   { dimension: 2, value: 'SecondDimension' }
    //   // Because websites are only 2D, obviously. WebGL? What's that?
    // ],

    // globalMetrics: [
    //   { metric: 1, value: 'MyMetricValue' },
    //   { metric: 2, value: 'AnotherMetricValue' }
    // ]
  });

  router.beforeEach((to, from, next) => {
    console.log(to.path);
    Vue.analytics.trackView(to.path);
    next();
  });
  Vue.filter("number", (value) =>
    isNaN(value) ? "" : Number(value).toLocaleString("en")
  );

  if (process.isClient) {
    const Paginate = require("vuejs-paginate");

    Vue.component("Paginate", Paginate);
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

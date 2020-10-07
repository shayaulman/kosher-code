<template>
  <Layout dontShowFooter>
    <section :style="`direction: ${direction}`" class="m-3">
      <div
        class="flex flex-col items-start md:flex-row-reverse md:justify-between md:align-top"
      >
        <g-link
          :title="`${$context.name}-חזור ל`"
          :to="`video-tutorials/${$context.name}`"
        >
          <div class="p-8">
            <app-icon
              v-if="$context.category !== 'elementor'"
              class="w-12 h-12"
              :icon="$context.name"
            /></div
        ></g-link>
        <div
          class="video-container relative w-full h-full bg-black container rounded-md overflow-hidden shadow-lg"
        >
          <div class="absolute z-0 inset-0 flex items-center justify-center">
            <app-loader youtube />
          </div>
          <iframe
            class="relative z-10"
            :src="`https://www.youtube.com/embed/${$context.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            autoplay="1"
          ></iframe>
        </div>
      </div>

      <section class="relative flex"></section>
      <h4
        class="py-6 mt-3 text-xs text-custom-text-3 font-hairline border-b border-custom-bg-card"
      >
        {{ formattedTime }}
      </h4>

      <section style="width: 640px" class="my-3">
        <h1 class="my-1 py-2 text-custom-text-primary text-lg">
          {{ $context.title }}
        </h1>
        <p
          v-html="description"
          class="text-custom-text-3 text-sm font-thin"
        ></p>
        <button
          @click="showMore = !showMore"
          class="m-2 p-2 rounded text-custom-text-secondary font-bold outline-none"
        >
          {{
            isHebrew
              ? showMore
                ? "הצג פחות"
                : "הצג יותר"
              : showMore
              ? "Show Less"
              : "Show More"
          }}
        </button>
      </section>
    </section>
  </Layout>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
import AppIcon from "~/components/UI/AppIcon";
export default {
  components: {
    AppLoader,
    AppIcon,
  },

  data() {
    return {
      showMore: false,
    };
  },
  computed: {
    isHebrew() {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(this.$context.title);
    },
    direction() {
      return this.isHebrew ? "rtl" : "ltr";
    },

    description() {
      return this.showMore
        ? this.fullFormattedDescription
        : this.firstPargaraphOfDescription;
    },

    firstPargaraphOfDescription() {
      return this.formatter(this.$context.description.split("\n")[0]);
    },

    formattedTime() {
      const d = new Date(this.$context.publishedAt);
      return d.toDateString();
    },

    fullFormattedDescription() {
      return this.formatter(this.$context.description);
    },
  },

  methods: {
    formatter(text) {
      let createTextLinks = (text || "").replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
        function (match, space, url) {
          var hyperlink = url;
          if (!hyperlink.match("^https?://")) {
            hyperlink = "http://" + hyperlink;
          }
          return (
            space + '<a class="link" href="' + hyperlink + '">' + url + "</a>"
          );
        }
      );

      return createTextLinks.replace(/\n/g, "<br/>");
    },
  },
};
</script>

<style scoped>
.video-container {
  overflow: hidden;
  position: relative;
  width: 65%;
}

.video-container::after {
  padding-top: 56.25%;
  display: block;
  content: "";
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

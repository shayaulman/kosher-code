<template>
  <Layout>
    <section class="p-12 mx-auto">
      <div style="width:100px" class="mb-12 mx-auto">
        <app-icon
          v-if="$context.technology !== 'elementor'"
          :icon="$context.technology"
        />
        <h1
          :style="`color: ${$context.color}`"
          class="p-2 text-lg text-center text-custom-text-primary"
        >
          {{ $context.hebrewName }}
        </h1>
      </div>
      <div class="flex justify-between">
        <h3 class="text-xs text-custom-text-secondary opacity-75">
          מציג
          <span class="text-custom-text-primary">{{
            technologies.length
          }}</span>
          סרטונים מתוך
          <span class="text-custom-text-primary">{{
            technologies.length
          }}</span>
        </h3>
        <button
          @click="toggle"
          class="my-1 px-4 py-1 text-white text-xs bg-black rounded-full shadow-outline focus:outline-none"
        >
          {{ hebrewOnly ? "הצג כל הסרטונים" : "הצג רק סרטונים בעברית" }}
        </button>
      </div>
    </section>
    <transition-group
      name="fade"
      mode="in-out"
      style="direction:ltr"
      class="mb-24 flex flex-wrap justify-center"
    >
      <video-card
        v-for="course in technologies"
        :key="course.node.id"
        :id="course.node.id"
        :title="course.node.title"
        :description="course.node.description"
        :is-hebrew="detectHebrew([course.node.title, course.node.description])"
        :category="$context.technology"
        :thumbnail="course.node.thumbnail"
        :color="course.node.color"
      />
    </transition-group>
  </Layout>
</template>

<page-query>
 query Vid ($technology: String!){
 videos: allVideo (sortBy: "index" order:ASC filter: {category: {eq: $technology}}) {
    edges {
      node {
        id
        title
        description
        category
        thumbnail
        color
      }
    }
  }
}
 </page-query>

<script>
import VideoCard from "~/components/VideoCard";
import AppIcon from "~/components/UI/AppIcon";
export default {
  components: {
    VideoCard,
    AppIcon
  },
  data() {
    return {
      technologies: [],
      hebrewOnly: false
    };
  },
  methods: {
    toggle() {
      this.hebrewOnly = !this.hebrewOnly;
    },

    detectHebrew(txtArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      const WORD_HEBREW = new RegExp("hebrew", "i");

      const CONTAINS_HEBREW = txtArr.some(txt => HEBREW.test(txt));
      const CONTAINS_THE_WORD_HEBREW = txtArr.some(txt =>
        WORD_HEBREW.test(txt)
      );

      return CONTAINS_HEBREW || CONTAINS_THE_WORD_HEBREW;
    },

    doesContainWordHebrew(textArr) {
      const WORD_HEBREW = new RegExp("(hebrew)", "i");
      return textArr.some(txt => WORD_HEBREW.test(txt));
    }
  },
  watch: {
    hebrewOnly: function(val) {
      if (val) {
        this.technologies = this.technologies.filter((video, i) =>
          this.detectHebrew([video.node.title, video.node.description])
        );
      } else {
        this.technologies = this.$page.videos.edges;
      }
    }
  },
  mounted() {
    this.technologies = this.$page.videos.edges;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.9);
}
</style>

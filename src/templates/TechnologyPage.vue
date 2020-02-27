<template>
  <Layout>
    <section class="p-12 mx-auto">
      <!-- <button @click="debug">debug</button> -->
      <div style="width:100px" class="mb-12 mx-auto">
        <app-icon
          v-if="$context.technology !== 'elementor'"
          :icon="$context.technology"
        />
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
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some(txt => {
        console.log(txt);
        return HEBREW.test(txt);
      });
    },
    debug() {
      console.log(this.technologies);
    }
  },
  watch: {
    hebrewOnly: function(val) {
      if (val) {
        this.technologies = this.technologies.filter((video, i) => {
          const HEBREW = RegExp("[\u0590-\u05FF]");
          return (
            HEBREW.test(video.node.title) || HEBREW.test(video.node.description)
          );
        });
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

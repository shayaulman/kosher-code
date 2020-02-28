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
          נמצאו
          <span class="text-custom-text-primary">{{
            $context.amountOfVideos
          }}</span>
          סרטונים
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
        v-for="course in videos"
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
    <ClientOnly>
      <infinite-loading @infinite="infiniteHandler">
        <div slot="no-more" class="text-custom-text-3"></div>
        <div slot="no-results" class="text-custom-text-3"></div>
      </infinite-loading>
    </ClientOnly>
  </Layout>
</template>

<page-query>
 query Vid ($technology: String! $page: Int){
 videos: allVideo (sortBy: "index" order:ASC filter: {category: {eq: $technology}} perPage: 9, page: $page)  @paginate {
   pageInfo {
			totalPages
			currentPage
		}
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
      hebrewOnly: false,
      loadedVideos: [],
      currentPage: 1
    };
  },

  computed: {
    videos() {
      return !this.hebrewOnly
        ? this.loadedVideos
        : this.loadedVideos.filter((video, i) =>
            this.detectHebrew([video.node.title, video.node.description])
          );
    }
  },
  methods: {
    async infiniteHandler($state) {
      if (this.currentPage + 1 > this.$page.videos.pageInfo.totalPages) {
        $state.complete();
      } else {
        const { data } = await this.$fetch(
          `/video-tutorials/${this.$context.technology}/${this.currentPage + 1}`
        );
        if (data.videos.edges.length) {
          this.currentPage = data.videos.pageInfo.currentPage;
          this.loadedVideos.push(...data.videos.edges);
          $state.loaded();
        } else {
          $state.complete();
        }
      }
    },

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
  created() {
    this.loadedVideos.push(...this.$page.videos.edges);
  },
  mounted() {
    this.technologies = this.$page.videos.edges;
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.93);
}
</style>

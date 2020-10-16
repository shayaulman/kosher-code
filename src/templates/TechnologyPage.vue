<template>
  <Layout>
    <section class="p-12 mx-auto">
      <div class="w-16 mx-auto">
        <app-icon
          v-if="$context.technology !== 'elementor'"
          :icon="$context.technology"
        />
      </div>
      <div>
        <h1
          :style="`color: ${$context.color}`"
          class="p-2 mb-12 text-lg text-center text-custom-text-primary"
        >
          {{ $context.hebrewName }}
        </h1>
      </div>
      <div class="flex justify-between">
        <h3 class="text-xs text-custom-text-secondary opacity-75">
          נמצאו
          <span class="text-custom-text-primary">
            {{ $context.amountOfVideos }}
          </span>
          סרטונים
        </h3>
        <button
          @click="toggle"
          class="my-1 px-4 py-1 text-white text-xs bg-black rounded-full shadow-outline focus:outline-none"
        >
          {{ hebrewOnly ? "הצג את כל הסרטונים" : "הצג רק סרטונים בעברית" }}
        </button>
      </div>
    </section>
    <transition-group name="fade" mode="in-out" style="direction: ltr">
      <section
        key="213"
        class="max-w-6xl mx-auto mb-24 flex flex-wrap justify-center"
      >
        <playlist-card
          v-for="playlist in playlists"
          :key="playlist.node.id"
          :name="playlist.node.name"
          :hebrew-name="playlist.node.hebrewName"
          :amount-of-videos="playlist.node.amountOfVideos"
          :thumbnail="playlist.node.thumbnail"
          :is-hebrew="playlist.node.hebrewName !== undefined"
        />
        <video-card
          v-for="course in videos"
          :key="course.node.id"
          :id="course.node.id"
          :title="course.node.title"
          :pub-date="course.node.publishedAt"
          :is-hebrew="
            detectHebrew([course.node.title, course.node.description])
          "
          :category="$context.technology"
          :thumbnail="course.node.thumbnail"
          :color="course.node.color"
        />
      </section>
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
 videos: allVideo (sortBy: "index" order:ASC filter: {name: {eq: $technology}} perPage: 30, page: $page)  @paginate {
   pageInfo {
			totalPages
			currentPage
		}
    edges {
      node {
        id
        title
        description
        name
        category
        thumbnail
        color
        publishedAt
      }
    }
  }
}
 </page-query>

<static-query>
 {
    categories: allCategory (filter: {category: {eq: "playlist"}}) {
        edges {
            node {
              name
              amountOfVideos
              hebrewName
              tags
              thumbnail
            }
        }
    }

}
 </static-query>

<script>
import VideoCard from "~/components/VideoCard";
import PlaylistCard from "~/components/PlaylistCard";
import AppIcon from "~/components/UI/AppIcon";
export default {
  components: {
    VideoCard,
    PlaylistCard,
    AppIcon,
  },
  data() {
    return {
      technologies: [],
      hebrewOnly: false,
      loadedVideos: [],
      loadedPlaylists: [],
      currentPage: 1,
    };
  },

  computed: {
    videos() {
      let videos = !this.hebrewOnly
        ? this.loadedVideos
        : this.loadedVideos.filter((video) =>
            this.detectHebrew([video.node.title, video.node.description])
          );
      return videos;
    },

    playlists() {
      const playlists = this.loadedPlaylists.filter((playlist) =>
        playlist.node.tags.includes(this.$context.technology)
      );
      return !this.hebrewOnly
        ? playlists
        : playlists.filter((playlist) => playlist.node.hebrewName !== undefined);
    },

    direction() {
      this.loadedVideos.some((video) => !this.detectHebrew([video.node.title]))
        ? "rtl"
        : "ltr";
    },
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

      const CONTAINS_HEBREW = txtArr.some((txt) => HEBREW.test(txt));
      const CONTAINS_THE_WORD_HEBREW = txtArr.some((txt) =>
        WORD_HEBREW.test(txt)
      );

      return CONTAINS_HEBREW || CONTAINS_THE_WORD_HEBREW;
    },

    doesContainWordHebrew(textArr) {
      const WORD_HEBREW = new RegExp("(hebrew)", "i");
      return textArr.some((txt) => WORD_HEBREW.test(txt));
    },
  },
  created() {
    this.loadedVideos.push(...this.$page.videos.edges);
  },
  mounted() {
    this.technologies = this.$page.videos.edges;
    this.loadedPlaylists = this.$static.categories.edges;
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0.5;
  transform: scale(0.975);
}
</style>

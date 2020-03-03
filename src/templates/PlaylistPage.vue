<template>
  <Layout dontShowFooter>
    <section :style="`direction: ${direction}`" class="m-3">
      <div class="flex flex-col lg:flex-row lg:align-start">
        <div class="flex-col">
          <div
            class="video-container relative bg-black container rounded-md overflow-hidden shadow-lg"
          >
            <div class="absolute z-0 inset-0 flex items-center justify-center">
              <app-loader youtube />
            </div>
            <iframe
              class="relative z-10"
              :src="`https://www.youtube.com/embed/${currentVideo}`"
              frameborder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <section style="width:640px" class="my-3">
            <h1 class="my-1 py-2 text-custom-text-primary text-lg">
              {{ $page.videos.edges[activeVideo - 1].node.title }}
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
        </div>
        <section class="mx-4">
          <playlist-list
            @selection="handle"
            :videos="$page.videos.edges"
            :active="activeVideo"
          />
        </section>
      </div>

      <section class="relative flex"></section>
      <!-- <h4
        class="py-6 mt-3 text-xs text-custom-text-3 font-hairline border-b border-custom-bg-card"
      >
        {{ formattedTime }}
      </h4> -->
    </section>
  </Layout>
</template>

<page-query>
 query Vid ($name: String! $page: Int){
 videos: allVideo (sortBy: "index" order:ASC filter: {name: {eq: $name}} perPage: 100, page: $page)  @paginate {
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

<script>
import PlaylistList from "~/components/PlaylistList";
import AppLoader from "~/components/UI/AppLoader";
export default {
  components: { PlaylistList, AppLoader },
  data() {
    return {
      playlistVideos: [],
      activeVideo: 1,
      showMore: false
    };
  },
  computed: {
    currentVideo() {
      return this.$page.videos.edges[this.activeVideo - 1].node.id;
    },
    isHebrew() {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(
        this.$page.videos.edges[this.activeVideo - 1].node.title
      );
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
      return this.formatter(
        this.playlistVideos[this.activeVideo].node.description.split("\n")[0]
      );
    },

    // formattedTime() {
    //   const d = new Date(this.$context.publishedAt);
    //   return d.toDateString();
    // },

    fullFormattedDescription() {
      return this.formatter(
        this.playlistVideos[this.activeVideo].node.description
      );
    }
  },
  methods: {
    handle(value) {
      console.log(value);
      this.activeVideo = value + 1;
    },
    formatter(text) {
      let createTextLinks = (text || "").replace(
        /([^\S]|^)(((https?\:\/\/)|(www\.))(\S+))/gi,
        function(match, space, url) {
          var hyperlink = url;
          if (!hyperlink.match("^https?:\/\/")) {
            hyperlink = "http://" + hyperlink;
          }
          return (
            space + '<a class="link" href="' + hyperlink + '">' + url + "</a>"
          );
        }
      );

      return createTextLinks.replace(/\n/g, "<br/>");
    }
  },
  created() {
    this.playlistVideos = this.$page.videos.edges;
  },
  mounted() {
    console.log(this.$page.videos.edges);
  }
};
</script>

<style scoped>
.video-container {
  overflow: hidden;
  position: relative;
  width: 100%;
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

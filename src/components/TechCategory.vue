<template>
  <section class="my-12">
    <h1 class="p-3 text-center text-custom-yellow-1 opacity-75">
      {{ hebrewName }}
    </h1>
    <div class="rtl max-w-4xl mx-auto flex flex-wrap justify-center">
      <div
        v-if="!filteredCategories.length"
        class="rtl max-w-4xl mx-auto flex flex-wrap justify-center"
      >
        <content-loader
          v-for="n in 12"
          :key="n"
          class="m-2 w-34 bg-custom-bg-card rounded-md transform hover:scale-105 transition ease-in duration-200"
          :speed="0.7"
          height="430"
          :primary-color="primaryColor"
          :secondary-color="secondaryColor"
        />
      </div>
      <tech-card
        v-else
        v-for="(category, i) in filteredCategories || 10"
        :key="i"
        :name="category.node.name"
        :hebrewName="category.node.hebrewName"
        :icon="category.icon"
        :amount-of-videos="amountOfVideos(category.node.name)"
        :color="category.node.color"
        :link="category.node.officialSite"
      />
    </div>
  </section>
</template>

<static-query>
{
  categories: allCategory {
    edges {
      node {
        name
        hebrewName
        category
        tags
        amountOfVideos
        officialSite
        color
      }
    }
  }
}
</static-query>

<script>
import { ContentLoader } from "vue-content-loader";
import TechCard from "~/components/TechCard";
export default {
  props: {
    category: String,
    hebrewName: String,
  },
  components: {
    ContentLoader,
    TechCard,
  },

  data() {
    return {
      categories: [],
      playlists: [],
    };
  },

  computed: {
    filteredCategories() {
      return [];
      // this.categories.filter(
      //   (cat) => cat.node.category === this.category
      // );
    },
    theme() {
      return this.$store.state.theme;
    },
    primaryColor() {
      return this.theme === "theme-dark" ? "#191c23" : "#edf2f7";
    },
    secondaryColor() {
      return this.theme === "theme-dark" ? "#1e2129" : "#f0f4f7";
    },
  },

  methods: {
    amountOfVideos(name) {
      const playlistVideos = this.playlists.filter((playlist) =>
        playlist.node.tags.includes(name.toLowerCase())
      );

      const amountOfVideos = this.categories.find((t) => t.node.name === name)
        .node.amountOfVideos;

      const amountOfPlaylistVideos = playlistVideos.reduce(
        (a, v) => a + v.node.amountOfVideos,
        0
      );
      return amountOfVideos + amountOfPlaylistVideos;
    },
    sortAlphabeically(array) {
      return array.sort((a, b) =>
        a.node.name.toLowerCase().localeCompare(b.node.name.toLowerCase())
      );
    },
  },
  mounted() {
    this.categories = this.sortAlphabeically(this.$static.categories.edges);
    this.playlists = this.categories.filter(
      (cat) => cat.node.category === "playlist"
    );
  },
};
</script>

<template>
  <section class="rtl max-w-4xl mx-auto flex flex-wrap justify-center">
    <tech-card
      v-for="(category, i) in categories"
      :key="i"
      :name="category.node.name"
      :hebrewName="category.node.hebrewName"
      :icon="category.icon"
      :color="category.node.color"
      :link="category.node.officialSite"
    />
  </section>
</template>

<static-query>
{
  categories: allCategory {
    edges {
      node {
        name
        hebrewName
        color
        officialSite
        amountOfVideos
      }
    }
  }
}
</static-query>

<script>
import TechCard from "~/components/TechCard";
export default {
  data() {
    return {
      technologies: require("../../data/videoTutorials"),
      categories: []
    };
  },
  components: {
    TechCard
  },
  methods: {
    sortAlphabeically(array) {
      return array.sort((a, b) =>
        a.node.name.toLowerCase().localeCompare(b.node.name.toLowerCase())
      );
    }
  },
  mounted() {
    this.categories = this.sortAlphabeically(this.$static.categories.edges);
  }
};
</script>

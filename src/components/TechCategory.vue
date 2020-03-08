<template>
  <section class="my-12">
    <h1 class="p-3 text-center text-custom-yellow-1 opacity-75">
      {{ hebrewName }}
    </h1>
    <div class="rtl max-w-4xl mx-auto flex flex-wrap justify-center">
      <tech-card
        v-for="(category, i) in filteredCategories"
        :key="i"
        :name="category.node.name"
        :hebrewName="category.node.hebrewName"
        :icon="category.icon"
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
        officialSite
        color
      }
    }
  }
}
</static-query>

<script>
import TechCard from "~/components/TechCard";
export default {
  props: {
    category: String,
    hebrewName: String
  },
  components: {
    TechCard
  },

  data() {
    return {
      categories: []
    };
  },

  computed: {
    filteredCategories() {
      return this.categories.filter(cat => cat.node.category === this.category);
    }
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

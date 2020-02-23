<template>
  <section class="ltr max-w-3xl mx-auto flex flex-wrap justify-center">
    <tech-card
      v-for="(tech, i) in technologiesSorted"
      :key="i"
      :name="tech.name"
      :icon="tech.icon"
      :color="tech.color"
      :link="tech.officialSite"
    />
  </section>
</template>

<script>
import TechCard from "~/components/TechCard";
export default {
  data() {
    return {
      technologies: require("../../Sources")
    };
  },
  components: {
    TechCard
  },
  computed: {
    technologiesSorted() {
      return this.technologies.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
  }
};
</script>

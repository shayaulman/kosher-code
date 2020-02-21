<template>
  <section class="flex flex-wrap justify-center">
    <tech-card
      v-for="(tech, i) in technologies"
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
  }
};
</script>

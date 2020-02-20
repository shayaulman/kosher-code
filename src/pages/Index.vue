<template>
  <Layout>
    <section class="mt-24">
      <h1 class="font m-4 p-2 text-center text-custom-green-1 font-thin">
        במאגר יש כעת <span>{{ amountOfVideos }}</span> סרטונים על
        <span>{{ amountOfTecnologies }}</span> טכנולוגיות שונות
      </h1>
      <tech-list />
    </section>
  </Layout>
</template>

<script>
import TechList from "@/components/TechList";
export default {
  metaInfo: {
    title: "Hello, Tailwind!"
  },
  components: {
    TechList
  },
  data() {
    return {
      technologies: require("../../Sources")
    };
  },

  computed: {
    amountOfVideos() {
      return this.technologies.reduce((a, b) => a + b.videoTutorials.length, 0);
    },

    amountOfTecnologies() {
      return this.technologies.length;
    }
  }
};
</script>

<style scoped>
.font {
  font-family: "Dosis", sans-serif;
}
</style>

<template>
  <Layout>
    <section class="mt-24">
      <h1 class="m-4 p-2 text-center text-white font-thin">
        במאגר יש לעת עתה <span>{{ amountOfVideos }}</span> סרטונים על
        <span>{{ amountOfTecnologies }}</span> טכנולוגיות
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

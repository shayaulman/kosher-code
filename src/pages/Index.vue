<template>
  <Layout>
    <section class="mt-24">
      <div class="heading">
        <div class="flex flex-col items-center mb-16">
          <h1 class="text-xl text-custom-text-primary">מאגר ענק של מקורות למידה למתכנתים</h1>

          <categories-slide />
          <h3 class="p-2 text-custom-text-secondary">
            שנבדקו ואושרו ע"י
            <a href="https://netfree.link/" style="color: #00b494" class="hover:underline">נטפרי</a>
          </h3>
        </div>
      </div>
      <div id="video-tutorials" class="pt-12 mb-48">
        <div class="flex justify-center">
          <button @click="contentShow = 'videos'" class="w-32 px-4 py-2 mx-1 text-center text-white rounded-full rtl bg-custom-brand">סרטוני הדרכה</button>
          <button @click="contentShow = 'channels'" class="w-32 px-4 py-2 mx-1 text-center text-white rounded-full rtl bg-custom-brand">ערוצים פתוחים</button>
        </div>

        <h1 class="p-2 m-4 text-xs font-thin text-center font text-custom-text-3">
          במאגר יש כעת
          <span>{{ amountOfVideos | number }}</span> סרטונים
        </h1>
        <channel-list v-if="contentShow === 'channels'"  />
        <tech-list v-else />
      </div>
    </section>
  </Layout>
</template>

<static-query>
{
  categories: allCategory {
    edges {
      node {
        amountOfVideos
      }
    }
  }
}
</static-query>

<script>
import TechList from "@/components/TechList";
import ChannelList from "@/components/ChannelList";
import CategoriesSlide from "@/components/CategoriesSlide";
export default {
  components: {
    TechList,
    ChannelList,
    CategoriesSlide,
  },

  data: () => ({
    contentShow: "videos",
  }),

  computed: {
    amountOfVideos() {
      return this.$static.categories.edges.reduce(
        (a, b) => a + b.node.amountOfVideos,
        0
      );
    },

    amountOfTecnologies() {
      return this.$static.categories.edges.length;
    },
  },

  mounted() {
    this.$store.commit("SET_THEME");
  },
};
</script>

<style scoped>
.heading {
  clip-path: polygon(50% 0%, 100% 0, 100% 65%, 50% 100%, 0 65%, 0 0);
}
</style>

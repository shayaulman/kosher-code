<template>
  <Layout>
    <section class=" mt-24">
      <div class="heading">
        <div class=" mb-16 flex flex-col items-center">
          <h1 class="text-xl text-custom-text-primary">
            מאגר ענק של מקורות למידה למתכנתים
          </h1>

          <categories-slide />
          <h3 class="p-2 text-custom-text-secondary">
            שנבדקו ואושרו ע"י<a
              href="https://netfree.link/"
              style="color: #00b494"
              class="hover:underline"
            >
              NetFree</a
            >
          </h3>
        </div>
      </div>
      <div id="video-tutorials" class="pt-12 mb-48">
        <h1
          class="rtl mx-auto w-32 py-2 px-4 text-center text-white bg-custom-brand rounded-full"
        >
          סרטוני הדרכה
        </h1>

        <h1
          class="font m-4 p-2 text-center text-xs text-custom-text-3 font-thin"
        >
          במאגר יש כעת <span>{{ amountOfVideos }}</span> סרטונים
        </h1>
        <tech-list />
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
import CategoriesSlide from "@/components/CategoriesSlide";
export default {
  components: {
    TechList,
    CategoriesSlide
  },

  computed: {
    amountOfVideos() {
      return this.$static.categories.edges.reduce(
        (a, b) => a + b.node.amountOfVideos,
        0
      );
    },

    amountOfTecnologies() {
      return this.$static.categories.edges.length;
    }
  }
};
</script>

<style scoped>
.heading {
  clip-path: polygon(50% 0%, 100% 0, 100% 65%, 50% 100%, 0 65%, 0 0);
}
</style>

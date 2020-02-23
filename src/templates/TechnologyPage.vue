<template>
  <Layout>
    <section class="p-16 m-auto">
      <div style="width:100px" class="m-auto">
        <app-icon :icon="$context.technology" />
      </div>
      <h3 class="text-custom-text-secondary">
        {{ $page.videos.edges.length }} סרטונים
      </h3>
      <button @click="toggle">
        {{ hebrewOnly ? "הצג כל הסרטונים" : "הצג רק סרטונים בעברית" }}
      </button>
    </section>
    <section style="direction:ltr" class="flex flex-wrap justify-center">
      <video-card
        v-for="course in $page.videos.edges"
        v-show="videosToShow"
        :key="course.node.id"
        :id="course.node.id"
        :title="course.node.title"
        :description="course.node.description"
        :hebrew="
          doesContainHebrewLetters([course.node.title]) ||
            doesContainHebrewLetters([course.node.description])
        "
        :category="$context.technology"
        :thumbnail="course.node.thumbnail"
        :color="course.node.color"
      />
    </section>
  </Layout>
</template>

<page-query>
 query Vid ($technology: String!){
 videos: allVideo (filter: {category: {eq: $technology}}) {
    edges {
      node {
        id
        title
        description
        category
        thumbnail
        color
      }
    }
  }
}
 </page-query>

<script>
import VideoCard from "~/components/VideoCard";
import AppIcon from "~/components/UI/AppIcon";
export default {
  components: {
    VideoCard,
    AppIcon
  },

  data() {
    return {
      hebrewOnly: false
    };
  },

  methods: {
    toggle() {
      this.hebrewOnly = !this.hebrewOnly;
    },
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some(txt => HEBREW.test(txt));
    }
  },

  computed: {
    videosToShow() {
      if (!this.hebrewOnly) return this.$page.videos.edges;

      return this.$page.videos.edges.filter();
    }
  }
};
</script>

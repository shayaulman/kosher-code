<template>
  <Layout>
    <section class="p-16 m-auto">
      <div style="width:100px" class="m-auto">
        <app-icon :icon="$context.technology" />
      </div>
      <h3 class="text-custom-text-secondary">{{ category.length }} סרטונים</h3>
    </section>
    <section style="direction:ltr" class="flex flex-wrap justify-center">
      <video-card
        v-for="course in category"
        :key="course.node.id"
        :id="course.node.id"
        :title="course.node.title"
        :description="course.node.description"
        :hebrew="course.node.hebrew"
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
  computed: {
    category() {
      return this.$page.videos.edges.filter(
        vid => vid.node.category.toLowerCase() === this.$context.technology
      );
    }
  }
};
</script>

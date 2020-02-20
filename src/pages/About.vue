<template>
  <section>
    <h1>{{ $context.technology }}</h1>
    <p>{{ $page.videos.edges }}</p>
    <!-- <video-card
      v-for="edge in $page.videos.edges"
      :key="edge.node.id"
      :title="edge.node.title"
      :description="edge.node.description"
      :category="edge.node.category"
    /> -->
  </section>
</template>

<page-query>
 query {
 videos: allVideo {
    edges {
      node {
        id
        title
        description
        category
      }
    }
  }
}
 </page-query>

<script>
import VideoCard from "~/components/VideoCard";
export default {
  components: {
    VideoCard
  },
  computed() {
    return this.$page.videos.edges.filter(
      vid => vid.node.category.toLowerCase() === this.$context
    );
  },
  mounted() {
    console.log(this.$context);
  }
};
</script>

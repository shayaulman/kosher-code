<template>
  <section class="p-3 bg-custom-bg-card h-full rounded">
    <playlist-item
      @video-selected="$emit('selection', $event)"
      v-for="(video, i) in videos"
      :key="i"
      :title="video.node.title"
      :thumbnail="video.node.thumbnail"
      :index="i"
      :active="active"
    />
  </section>
</template>

<script>
import PlaylistItem from "~/components/PlaylistItem";
export default {
  props: { videos: Array, active: Number },
  components: { PlaylistItem },
  methods: {}
};
</script>

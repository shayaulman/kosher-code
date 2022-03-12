<template>
  <div class="flex flex-wrap justify-center max-w-6xl mx-auto mb-24">
    <channel-card v-for="channel in $static.channels.edges" :key="channel.id" :title="channel.node.title" :thumbnail="channel.node.thumbnails.default.url" :custom-url="channel.node.customUrl" />
  </div>
</template>

<static-query>
{
   channels: allYoutubeChannel {
    edges {
      node {
        id,
        title,
        description,
        customUrl,
        thumbnails {
          default {
            url,
            width
          }
        }
      }
    }
  }
}
</static-query>

<script>
import ChannelCard from "@/components/ChannelCard.vue";
export default {
  name: "ChannelList",
  components: {
    ChannelCard,
  },
  mounted() {
    console.log(this.$static.channels.edges);
  },
};
</script>

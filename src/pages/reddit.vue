<template>
  <Layout>
    <reddit-card
      v-for="(cahnnel, i) in channels"
      :key="i"
      :channel="channels.channel"
      :color="channels.color"
    />
  </Layout>
</template>

<script>
import RedditCard from "~/components/RedditCard";
export default {
  components: { RedditCard },
  data() {
    return {
      channels: [{ name: "vuejs", color: "green" }]
    };
  }
};
</script>

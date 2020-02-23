<template>
  <Layout>
    <div class=" flex justify-center"><reddit-icon :size="'100'" /></div>

    <h1 class="py-16 px-8 text-center text-custom-text-3">
      Reddit מוגדר ב-<span style="color: #00b494">Netfree</span> כרשת חברתית,
      בכל זאת ישנה אפשרות לפתיחת בלוגים ספציפיים
    </h1>
    <section
      class="ltr max-w-4xl mx-auto my-12 flex flex-wrap justify-center items-center"
    >
      <reddit-card
        v-for="(channel, i) in channelsSorted"
        :key="i"
        :channel="channel.name"
        :color="channel.color"
      />
    </section>
  </Layout>
</template>

<script>
import RedditCard from "~/components/RedditCard";
import RedditIcon from "~/components/UI/RedditIcon";
export default {
  components: { RedditCard, RedditIcon },
  data() {
    return {
      channels: [
        { name: "vuejs", color: "#5ab58d" },
        { name: "reactjs", color: "#004075" },
        { name: "angular", color: "#228ddc" },
        { name: "programming", color: "#002631" },
        { name: "python", color: "#6186b3" },
        { name: "javascript", color: "#e6ad12" },
        { name: "learnprogramming", color: "#57b869" },
        { name: "ProgrammerHumor", color: "#777ab5" },
        { name: "java", color: "#2495E8" },
        { name: "LearnJavaScript", color: "#2495E8" },
        { name: "WordPress", color: "#00678c" }
      ]
    };
  },

  computed: {
    channelsSorted() {
      return this.channels.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    }
  }
};
</script>

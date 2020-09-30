<template>
  <Layout>
    <div class="flex justify-center">
      <reddit-icon :size="'100'" />
    </div>

    <h1 class="py-16 px-8 text-center text-custom-text-3">
      Reddit מוגדר ב-
      <span style="color: #00b494">נטפרי</span> כרשת חברתית, בכל זאת ישנה אפשרות
      לפתיחת בלוגים ספציפיים
    </h1>
    <div
      class="flex flex-col items-center justify-center text-custom-text-primary"
    >
      <input
        v-model="searchString"
        type="text"
        placeholder="חיפוש"
        class="w-84 px-4 py-2 border-0 ext-custom-text-3 bg-custom-bg-3 rounded-md focus:shadow-outline focus:outline-none"
      />
      <p class="p-4 text-sm text-custom-text-secondary opacity-75">
        מציג
        <span class="text-custom-text-primary">{{
          channelsFiltered.length
        }}</span>
        ערוצים מתוך
        <span class="text-custom-text-primary">{{ channels.length }}</span>
      </p>
    </div>

    <transition-group
      v-if="channelsFiltered.length"
      name="fade"
      class="ltr max-w-4xl mx-auto mt-24 mb-12 flex flex-wrap justify-center items-center"
    >
      <reddit-card
        v-for="(channel, i) in channelsFiltered"
        :key="i"
        :channel="channel.item.name"
        :color="channel.item.color"
      />
    </transition-group>
    <div v-else class="text-lg p-12 text-center text-custom-text-secondary">
      <p>אין תוצאות</p>
      <p class="text-3xl">😢</p>
    </div>
    <section class="flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">
        ידוע לכם על Sub-Reddit שפתוח בנטפרי ואינו מופיע במאגר?
      </h1>
      <g-link to="/contact">
        <button
          class="px-5 py-1 text-custom-text-secondary bg-custom-brand rounded-full"
        >
          שלחו לנו
        </button>
      </g-link>
      <h3 class="p-2 text-custom-text-3">ונכניס את זה למאגר!</h3>
    </section>
  </Layout>
</template>

<page-query>
{
  reddit: allReddit {
    edges {
      node {
        name
        color
        id
      }
    }
  }
}
 </page-query>

<script>
import Fuse from "fuse.js";
import RedditCard from "~/components/RedditCard";
import RedditIcon from "~/components/UI/RedditIcon";
export default {
  components: { RedditCard, RedditIcon },
  data() {
    return {
      channels: [],
      searchString: "",
    };
  },

  computed: {
    channelsSorted() {
      return this.channels.sort((a, b) =>
        a.item.name.toLowerCase().localeCompare(b.item.name.toLowerCase())
      );
    },
    channelsFiltered() {
      if (!this.searchString) {
        return this.channelsSorted;
      }
      const nodesExtracted = this.channelsSorted.map((object) => object.item);
      const options = {
        keys: ["name"],
        includeScore: true,
      };
      const fuse = new Fuse(nodesExtracted, options);
      const results = fuse.search(this.searchString);
      console.log(results.length);

      const filtered = this.filterByMaxScore(results, 0.34);
      console.log(filtered.length);
      return filtered;
    },
  },

  methods: {
    filterByMaxScore(array, scoreFloat) {
      return array.filter((object) => object.score < scoreFloat);
    },
  },
  created() {
    this.channels = this.$page.reddit.edges.map((object) => {
      const item = { item: object.node };
      delete object.item;
      return item;
    });
  },
};
</script>


<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: scale(0.7);
}
</style>

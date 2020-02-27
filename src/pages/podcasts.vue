<template>
  <Layout>
    <div class="my-8 flex justify-center"><podcast-icon /></div>
    <section class="mx-auto my-16 flex flex-col items-center">
      <podcast-card
        v-for="(podcast, i) in $page.podcast.edges"
        :key="i"
        :name="podcast.node.name"
        :description="podcast.node.description"
        :link="podcast.node.link"
        :image="podcast.node.image"
        :color="podcast.node.color"
        :hebrew="isHebrew(podcast.node.description)"
      />
    </section>
    <section class="flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">
        ידוע לכם על פודקאסט בנושאי תכנות שפתוח בנטפרי (אנגלית או עברית)?
      </h1>
      <g-link to="/contact">
        <button
          class="px-5 py-1 text-custom-text-3 bg-custom-brand rounded-full"
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
  podcast: allPodcast (sortBy: "index"  order:ASC) {
    edges {
      node {
        name
        description
        link
        color
        image 
      }
    }
  }
}
 </page-query>

<script>
import PodcastCard from "~/components/PodcastCard";
import PodcastIcon from "~/components/UI/PodcastIcon";
export default {
  components: { PodcastIcon, PodcastCard },

  methods: {
    isHebrew(text) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(text);
    }
  }
};
</script>

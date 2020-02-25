<template>
  <Layout>
    <div class="my-8 flex justify-center"><podcast-icon /></div>
    <section class="mx-auto my-16 flex flex-col items-center">
      <podcast-card
        v-for="(podcast, i) in podcasts"
        :key="i"
        :name="podcast.name"
        :description="podcast.description"
        :link="podcast.link"
        :image="podcast.image"
        :color="podcast.color"
        :hebrew="isHebrew(podcast.description)"
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

<script>
import PodcastCard from "~/components/PodcastCard";
import PodcastIcon from "~/components/UI/PodcastIcon";
export default {
  components: { PodcastIcon, PodcastCard },
  data() {
    return {
      podcasts: [
        {
          name: "רברס עם פלטפורמה",
          description: "הפודקאסט של אורי ורן",
          link: "www.reversim.com",
          color: "#ff2600"
        },
        {
          name: "Chanelog",
          description: "News and podcasts for developers",
          link: "changelog.com",
          image:
            "https://cdn.changelog.com/images/brand/changelog-logomark-97913322799ebebe4ec08d1ee2492899.svg?vsn=d",
          color: "#3d765f"
        },
        {
          name: "Syntax",
          description: "A Tasty Treats Podcast for Web Developers.",
          link: "syntax.fm",
          image: require("~/assets/icons/syntaxfm.png"),
          color: "#d0a650"
        }
      ]
    };
  },

  methods: {
    isHebrew(text) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(text);
    }
  }
};
</script>

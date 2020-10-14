<template>
  <Layout>
    <div class="my-8 flex justify-center"><student-icon /></div>
    <div
      class="ltr max-w-4xl mx-auto my-6 flex flex-wrap justify-center items-center"
    >
      <learning-platform-card
        v-for="platform in learningPlatforms"
        :key="platform.node.name"
        :name="platform.node.name"
        :desc="platform.node.desc"
        :link="platform.node.link"
        :tags="platform.node.tags"
        :hebrew="platform.node.isHebrew"
        :color="platform.node.color"
      />
    </div>
    <section class="text-sm flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">
        ידוע לכם על פלטפורמת לימודים (באנגלית או עברית) שפתוח בנטפרי ואינו מופיע
        במאגר?
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
  learningPlatform: allLearningPlatform {
    edges {
      node {
        name
        desc
        link
        color
        tags
      }
    }
  }
}
 </page-query>

<script>
import LearningPlatformCard from "~/components/LearningPlatformCard";
import StudentIcon from "~/components/UI/StudentIcon";

export default {
  components: { LearningPlatformCard, StudentIcon },
  data() {
    return {
      platforms: [],
      searchString: "",
    };
  },

  computed: {
    learningPlatforms() {
      return this.$page.learningPlatform.edges;
    },
  },
};
</script>


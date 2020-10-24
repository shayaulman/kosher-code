<template>
  <Layout>
    <div class="my-8 flex justify-center"><student-icon /></div>
    <ul
      class="rtl max-w-5xl mb-8 mx-auto p-4 flex justify-center flex-wrap text-xs"
    >
      <li
        @click="selectedTagString = ''"
        :class="{ 'shadow-outline': !selectedTagString }"
        class="m-1 py-1 px-2 bg-custom-brand text-gray-200 text-xxs rounded cursor-pointer"
      >
        הכל
      </li>
      <li
        v-for="tag in tagsWithColors"
        @click="selectedTagString = tag.name"
        :key="tag.name"
        :style="`color: ${tag.color}; background: ${tag.background}`"
        :class="{ 'shadow-outline': selectedTagString === tag.name }"
        class="m-1 py-1 px-2 text-xxs rounded cursor-pointer"
      >
        {{ tag.name }}
      </li>
    </ul>
    <h3 class="max-w-5xl mr-24 text-custom-text-primary text-xxs font-hairline">
      נמצא{{ filteredLearningPlatforms.length > 1 ? "ו" : "ה" }}
      <span class="font-bold"> {{ filteredLearningPlatforms.length }}</span>
      פלטפורמ{{ filteredLearningPlatforms.length === 1 ? "ה" : "ות" }}
    </h3>
    <transition-group
      name="fade"
      class="ltr max-w-5xl mx-auto my-6 flex flex-wrap justify-center items-center"
    >
      <learning-platform-card
        v-for="platform in filteredLearningPlatforms"
        @tag-selected="selectedTagString = $event"
        :key="platform.node.name"
        :name="platform.node.name"
        :desc="platform.node.desc"
        :link="platform.node.link"
        :tags="selectTags(platform.node.tags)"
        :selected-tag="selectedTagString"
        :hebrew="platform.node.isHebrew"
        :color="platform.node.color"
      />
    </transition-group>
    <section class="text-sm flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">
        ידוע לכם על פלטפורמת לימודים (באנגלית או עברית) שפתוח בנטפרי ואינו מופיע
        במאגר?
        <a
          href="https://github.com/shayaulman/kosher-code/blob/master/data/learningPlatforms.js"
          class="underline"
          >ערוך ישירות את המקור</a
        >, או
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
import colors from "~/assets/colors";

export default {
  components: { LearningPlatformCard, StudentIcon },
  data() {
    return {
      platforms: [],
      selectedTagString: "",
      colors: colors,
      // !TODO: maybe use tech colors
    };
  },

  computed: {
    learningPlatforms() {
      return this.$page.learningPlatform.edges.sort((a, b) => {
        return a.node.name
          .toLowerCase()
          .localeCompare(b.node.name.toLowerCase());
      });
    },
    filteredLearningPlatforms() {
      if (!this.selectedTagString) {
        return this.learningPlatforms;
      }
      const filtered = this.learningPlatforms.filter((platform) => {
        return platform.node.tags.includes(this.selectedTagString);
      });
      return filtered;
    },
    tagList() {
      let tagList = [];
      this.learningPlatforms.forEach((platform) => {
        const tags = platform.node.tags;
        tags.forEach((tag) => {
          if (!tagList.includes(tag)) {
            tagList.push(tag);
          }
        });
      });
      return tagList;
    },
    tagsWithColors() {
      let tagsWithColors = [];
      this.tagList.forEach((tag, i) => {
        tagsWithColors.push({
          name: tag,
          background: this.colors[i]?.background || "#CC0033",
          color: this.colors[i]?.color || "#fff",
        });
      });

      const englishTagsSorted = tagsWithColors
        .sort((a, b) => {
          return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        })
        .filter((tag) => !this.isHebrew(tag.name));

      const hebrewTags = tagsWithColors
        .filter((tag) => this.isHebrew(tag.name))
        .sort((a, b) => (a.name !== "עברית") - (b.name !== "עברית"));
      return [...hebrewTags, ...englishTagsSorted];
    },
  },

  methods: {
    selectTags(tagList) {
      const selectedTags = tagList.map((tag) => {
        return this.tagsWithColors.find((t) => t.name === tag);
      });
      return selectedTags;
    },
    isHebrew(text) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(text);
    },
  },
};
</script>

<style lang="scss">
// https://codepen.io/andymerskin/pen/eRNvLR
.fade-enter-active {
  transition: 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-move {
  transition: 0.3s ease;
}
</style>

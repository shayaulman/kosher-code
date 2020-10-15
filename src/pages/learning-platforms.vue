<template>
  <Layout>
    <div class="my-8 flex justify-center"><student-icon /></div>
    <ul
      class="rtl max-w-4xl mb-8 mx-auto p-4 flex justify-center flex-wrap text-xs"
    >
      <li
        @click="selectedTagString = ''"
        :class="{ 'shadow-outline': !selectedTagString }"
        class="m-2 px-3 py-1 bg-custom-brand text-gray-200 -xxs rounded-full cursor-pointer"
      >
        הכל
      </li>
      <li
        v-for="tag in tagsWithColors"
        @click="selectedTagString = tag.name"
        :key="tag.name"
        :style="`color: ${tag.color}; background: ${tag.background}`"
        :class="{ 'shadow-outline': selectedTagString === tag.name }"
        class="m-2 px-3 py-1 text-xs rounded-full cursor-pointer"
      >
        {{ tag.name }}
      </li>
    </ul>

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
      selectedTagString: "",
      colors: [
        { color: "white", background: "#0029d0" },
        { color: "white", background: "#428bca" },
        { color: "white", background: "#44ad8e" },
        { color: "black", background: "#a8d695" },
        { color: "white", background: "#5cb85c" },
        { color: "black", background: "#69D100" },
        { color: "white", background: "#004f00" },
        { color: "white", background: "#34495e" },
        { color: "white", background: "#7f8c8d" },
        { color: "black", background: "#a295d6" },
        { color: "white", background: "#5843ad" },
        { color: "white", background: "#8e44ad" },
        { color: "black", background: "#ffecdb" },
        { color: "white", background: "#ad4363" },
        { color: "white", background: "#D10069" },
        { color: "white", background: "#CC0033" },
        { color: "white", background: "#FF0000" },
        { color: "white", background: "#D9534F" },
        { color: "black", background: "#d1d300" },
        { color: "black", background: "#f0ad4e" },
        { color: "white", background: "#ae8e3c" },
      ],
    };
  },

  computed: {
    learningPlatforms() {
      return this.$page.learningPlatform.edges;
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
          background: this.colors[i].background,
          color: this.colors[i].color,
        });
      });

      const sorted = tagsWithColors.sort((a, b) => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      return sorted;
    },
  },

  methods: {
    log() {
      console.log("tes");
    },
    selectTags(tagList) {
      const selectedTags = tagList.map((tag) => {
        return this.tagsWithColors.find((t) => t.name === tag);
      });
      return selectedTags;
    },
  },
};
</script>

<style lang="scss">
// https://codepen.io/andymerskin/pen/eRNvLR
.fade-enter-active {
  transition: 0.2s ease;
}

.fade-leave-active {
  transition: opacity 0.2s ease;
  position: absolute;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.fade-move {
  transition: 0.2s ease;
}
</style>

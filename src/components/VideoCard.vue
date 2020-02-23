<template>
  <section
    :style="`direction: ${direction}`"
    class="card w-72 m-3 rounded-md bg-custom-bg-card"
  >
    <g-link :to="`video-tutorials/${category}/${id}`">
      <div class="relative">
        <div class="absolute top-0 w-full flex justify-center z-0">
          <app-loader :color="color" />
        </div>
        <img
          style="height:180px;"
          :src="thumbnail"
          height="90"
          class="relative z-10 rounded-t-md"
        />
      </div>
      <div class="relative p-4">
        <div
          v-if="isHebrew"
          class="-mt-4 mr-3 absolute top-0 right-0 z-20 rounded-full overflow-hidden bg-white shadow-lg"
        >
          <israel-flag-icon />
        </div>
        <h2 :style="`color: ${color}`" class="py-2 font-thin">{{ title }}</h2>
        <p class="py-2 text-custom-text-secondary font-hairline text-xs">
          {{ formattedDescription }}
        </p>
      </div>
    </g-link>
  </section>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
import IsraelFlagIcon from "~/components/UI/IsraelFlagIcon";

export default {
  props: {
    id: String,
    title: String,
    description: String,
    category: String,
    thumbnail: String,
    color: String
  },

  components: {
    AppLoader,
    IsraelFlagIcon
  },

  methods: {
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some(txt => HEBREW.test(txt));
    },

    doesContainWordHebrew(textArr) {
      const WORD_HEBREW = new RegExp("hebrew", "i");
      return textArr.some(txt => WORD_HEBREW.test(txt));
    }
  },

  computed: {
    formattedDescription() {
      const spliced =
        this.description
          .split(" ")
          .slice(0, 20)
          .join(" ") + "...";

      if (spliced.length > 250) {
        return (
          spliced
            .split("")
            .slice(0, 250)
            .join("") + "..."
        );
      }
      return spliced;
    },

    direction() {
      return this.doesContainHebrewLetters([this.title]) ? "rtl" : "ltr";
    },

    isHebrew() {
      return (
        this.doesContainHebrewLetters([this.title, this.description]) ||
        this.doesContainWordHebrew([this.title, this.description])
      );
    }
  }
};
</script>

<style scoped>
.card {
  transition: 0.3s ease-in;
}

.card:hover {
  transform: scale(1.03);
}
</style>

<template>
  <section
    :class="direction"
    :style="`border-top: 3px solid ${color}`"
    class="m-2 h-24 w-96 flex items-center bg-custom-bg-card-2 rounded-md transform hover:-translate-x-1 ease-in duration-100"
  >
    <div
      :class="[hebrew ? 'rounded-r-md' : 'rounded-l-md']"
      class="h-full bg-custom-bg-card"
    >
      <div class="w-12 h-12 m-4">
        <g-image v-if="image.length > 0" :src="handleImage" />
        <podcast-icon v-else small class="" />
      </div>
    </div>

    <div class="p-6">
      <g-link :to="`${link}`" target="_blank" class="px-8">
        <h1 :style="`color: ${color}`" class="text-xl text-custom-text-primary">
          {{ name }}
        </h1>
        <p class="text-xs text-custom-text-3">{{ description }}</p>
      </g-link>
    </div>
  </section>
</template>

<script>
import PodcastIcon from "~/components/UI/PodcastIcon.vue";
export default {
  props: {
    name: String,
    description: String,
    link: String,
    image: String,
    color: String,
    hebrew: Boolean
  },

  components: { PodcastIcon },

  computed: {
    handleImage() {
      const splitedPath = this.image.split(".");
      const isPng = splitedPath[splitedPath.length - 1] === "png";
      return isPng ? require("~/assets/icons/syntaxfm.png") : this.image;
    },
    direction() {
      return this.hebrew ? "rtl" : "ltr";
    }
  }
};
</script>

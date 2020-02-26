<template>
  <section
    class="m-2 w-32 bg-custom-bg-card rounded-md transform hover:scale-105 transition ease-in duration-200"
  >
    <div class="pt-2 px-5">
      <g-link
        :to="`/video-tutorials/${name.toLowerCase()}`"
        :style="`color: ${color}`"
        class="text-center"
      >
        <app-icon
          v-if="name !== 'Elementor'"
          :icon="name.toLowerCase()"
          class="w-24"
        />
        <g-image src="~/assets/icons/elementor.png" v-else class="mb-2 p-1" />
        <h3 class="py-1 px-2 text-center font-light">{{ hebrewName }}</h3>
      </g-link>
    </div>
    <div class="px-4 pb-2 flex justify-between items-center">
      <g-link
        :to="`https://${link}`"
        target="_blank"
        :style="hoverColor"
        class="link text-gray-600 transition ease-in duration-200"
        ><external-icon
      /></g-link>
      <div class="flex items-center text-xs text-gray-700">
        <!-- <youtube-icon /> -->
        <p class="ml-2">{{ amountOfVideos }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import AppIcon from "~/components/UI/AppIcon";
import ExternalIcon from "~/components/UI/ExternalIcon";
import YoutubeIcon from "~/components/UI/YoutubeIcon";
export default {
  props: {
    name: String,
    hebrewName: String,
    icon: String,
    color: String,
    link: String
  },
  data() {
    return {
      technologies: require("../../data/videoTutorials"),
      icons: require("~/assets/icons/SvgIcons")
    };
  },
  components: {
    AppIcon,
    ExternalIcon,
    YoutubeIcon
  },
  // I'm so excited with this solution! the power of CSS custom props...
  computed: {
    amountOfVideos() {
      return this.technologies.find(t => t.name === this.name).videoTutorials
        .length;
    },
    hoverColor() {
      return {
        "--color-hover": this.color
      };
    }
  }
};
</script>

<style scoped>
.link:hover {
  color: var(--color-hover);
}
</style>

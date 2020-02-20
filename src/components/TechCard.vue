<template>
  <section class="m-2  bg-custom-bg-card rounded-md">
    <div class="pt-2 px-5">
      <g-link
        :to="`/${name.toLowerCase()}`"
        :style="`color: ${color}`"
        class="text-center"
      >
        <app-icon :icon="name.toLowerCase()" class="w-24" />
        <h3 class="p-2 text-center font-light">{{ name }}</h3>
      </g-link>
    </div>
    <div class="px-4 py-1 flex justify-between items-center">
      <g-link
        :to="`https://${link}`"
        target="_blank"
        :style="hoverColor"
        class="link text-gray-600 transition ease-in duration-200"
        ><external-icon
      /></g-link>
      <div class="flex items-center text-xs text-gray-700">
        <p class="ml-2">{{ amountOfVideos }}</p>
        <youtube-icon />
      </div>
    </div>
  </section>
</template>

<script>
import AppIcon from "~/components/UI/AppIcon";
import ExternalIcon from "~/components/UI/ExternalIcon";
import YoutubeIcon from "~/components/UI/YoutubeIcon.vue";
export default {
  props: {
    name: String,
    icon: String,
    color: String,
    link: String
  },
  data() {
    return {
      technologies: require("../../Sources"),
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

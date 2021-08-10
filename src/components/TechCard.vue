<template>
  <section
    class="m-2 w-34 flex flex-col bg-custom-bg-card rounded-md transform hover:scale-105 transition ease-in duration-200"
  >
    <div class="pt-2 px-5 flex-grow">
      <g-link
        :to="`/video-tutorials/${name.toLowerCase()}`"
        :style="`color: ${color}`"
        class="text-center flex flex-col justify-between h-full"
      >
        <app-icon
          v-if="name !== 'Elementor'"
          :icon="name.toLowerCase()"
          class="p-2 w-18"
        />
        <g-image
          src="!!assets-loader!~/assets/icons/elementor.png"
          v-else
          class="mb-2 p-1"
        />
        <h3 class="py-1 text-sm text-center font-light">
          {{ hebrewName }}
        </h3>
      </g-link>
    </div>
    <div class="px-4 pb-2 flex justify-between items-center">
      <g-link
        :to="link"
        target="_blank"
        :style="hoverColor"
        class="link text-gray-600 transition ease-in duration-200"
        ><external-icon
      /></g-link>
      <div class="flex items-center text-xs text-gray-700">
        <p class="ml-2">{{ amountOfVideos | number }}</p>
      </div>
    </div>
  </section>
</template>

<static-query>
{
  categories: allCategory {
    edges {
      node {
        name
        category
        amountOfVideos
      }
    }
  }
}
</static-query>

<script>
import AppIcon from "~/components/UI/AppIcon";
import ExternalIcon from "~/components/UI/ExternalIcon";
import YoutubeIcon from "~/components/UI/YoutubeIcon";
export default {
  props: {
    name: String,
    hebrewName: String,
    icon: String,
    amountOfVideos: Number,
    color: String,
    link: String,
  },
  data() {
    return {
      icons: require("~/assets/icons/SvgIcons"),
      playlists: [],
    };
  },
  components: {
    AppIcon,
    ExternalIcon,
    YoutubeIcon,
  },
  computed: {
    hoverColor() {
      return {
        "--color-hover": this.color,
      };
    },
  },
};
</script>

<style scoped>
.link:hover {
  color: var(--color-hover);
}
</style>

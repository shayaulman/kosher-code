<template>
  <section style="direction:ltr" class="w-72 m-3 rounded-md bg-custom-bg-card">
    <g-link :to="`/${category}/${id}`">
      <div class="relative">
        <div class="absolute top-0 w-full flex justify-center z-0">
          <app-loader :color="color" />
        </div>
        <div
          v-if="isHebrew"
          class="m-3 absolute top-0 right-0 z-20 rounded-full overflow-hidden bg-white shadow-lg"
        >
          <israel-flag-icon />
        </div>

        <img
          style="height:180px;"
          :src="thumbnail"
          height="90"
          class="relative z-10 rounded-t-md"
        />
      </div>
      <div class="p-4">
        <h2 :style="`color: ${color}`" class="py-2 font-thin">{{ title }}</h2>
        <p class="py-2 text-gray-400 font-hairline text-xs">
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

  computed: {
    formattedDescription() {
      return (
        this.description
          .split(" ")
          .slice(0, 20)
          .join(" ") + "..."
      );
    },

    isHebrew() {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return (
        HEBREW.test(this.description) || this.description.includes("Hebrew")
      );
    }
  }
};
</script>

<template>
  <section
    style="direction: ltr;"
    class="w-72 m-3 rounded-md bg-custom-bg-card"
  >
    <g-link :to="`/${category}/${id}`">
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
      <div class="p-4">
        <h2 :style="`color: ${color}`" class="py-2 font-thin">{{ title }}</h2>
        <p class="py-2 text-gray-400 font-hairline text-xs">
          {{ description }}
        </p>
      </div>
    </g-link>
  </section>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
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
    AppLoader
  }
};
</script>

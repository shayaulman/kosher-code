<template>
  <g-link
    :style="`border-top: 3px solid ${color}`"
    class="m-2 py-2 px-6 w-64 text-center text-lg bg-custom-bg-card rounded-md transform hover:scale-105 transition ease-in duration-200"
    :to="`https://www.reddit.com/r/${channel}/`"
  >
    <div class="-mt-2 ltr flex items-center">
      <div class="p-2">
        <reddit-icon :size="'26'" />
      </div>
      <h1 :style="`color: ${color}`" class="mt-2 p-2 text-sm">
        r/{{ channel }}
      </h1>
    </div>
  </g-link>
</template>

<script>
import RedditIcon from "~/components/UI/RedditIcon";
export default {
  props: {
    channel: String,
    color: String,
  },
  components: { RedditIcon },
};
</script>

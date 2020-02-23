<template>
  <g-link
    :style="`background:${color}`"
    class=" m-2 py-2 px-12 w-64 text-white text-lg rounded-md transform hover:scale-105 transition ease-in duration-200"
    :to="`https://www.reddit.com/r/${channel}`"
  >
    <div class="ltr flex">
      <div class="p-2"><reddit-icon :size="'26'" /></div>
      <h1 class="p-2 text-white">r/{{ channel }}</h1>
    </div>
  </g-link>
</template>

<script>
import RedditIcon from "~/components/UI/RedditIcon";
export default {
  props: {
    channel: String,
    color: String
  },
  components: { RedditIcon }
};
</script>

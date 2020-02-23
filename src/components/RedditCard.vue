<template>
  <g-link :to="`https://www.reddit.com/r/${channel}`">
    <h1>r/{{ channel }}</h1>
  </g-link>
</template>

<script>
export default {
  props: {
    channel: String,
    color: String
  }
};
</script>

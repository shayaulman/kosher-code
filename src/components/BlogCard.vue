<template>
  <g-link
    :style="`border-top: 3px ${color} solid`"
    :class="{ 'bg text-custom-text-primary': isMedium }"
    class="test m-2 py-4 px-6 w-64 h-24 text-center text-white bg-custom-bg-card text-lg rounded-md transform hover:scale-105 transition ease-in duration-200"
    :to="link"
  >
    <h1 :style="`color:${color}`" class="text-lg" dir="auto">{{ name }}</h1>
    <p class="text-xs text-custom-gray-1 font-hairline opacity-75" dir="auto">
      {{ desc }}
    </p>
  </g-link>
</template>

<script>
export default {
  name: "BlogCard",
  props: {
    name: String,
    desc: String,
    link: String,
    color: String,
    isMedium: Boolean,
  },
};
</script>

<style lang="scss" scoped>
.bg {
  background: repeating-linear-gradient(
    45deg,
    var(--bg-card-2),
    var(--bg-card-2) 10px,
    #03a87c70 10px,
    #03a87c70 20px
  );
}
</style>

<template>
  <section
    @click="$emit('video-selected', index)"
    class="p-1 text-xs text-custom-text-primary cursor-pointer"
  >
    <div class="flex items-center">
      <h5 class="px-2 text-custom-text-3">
        {{ active === index + 1 ? "ac" : index + 1 }}
      </h5>
      <img
        style="width:90px;height:60px"
        width="90"
        height="60"
        :src="thumbnail"
        alt=""
      />
      <h1 class="m-1 p-2 ">{{ title }}</h1>
    </div>
  </section>
</template>

<script>
export default {
  props: { title: String, index: Number, thumbnail: String, active: Number }
};
</script>

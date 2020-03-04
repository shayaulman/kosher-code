<template>
  <section
    @click="$emit('video-selected', index)"
    :class="{ 'bg-custom-bg-card-2': isActive }"
    class="p-1 bg-custom-bg-card text-xs text-custom-text-primary cursor-pointer hover:bg-custom-bg-card-2"
  >
    <div class="flex items-center">
      <h5 class="w-8 p-2 text-custom-text-3">
        {{ isActive ? "&#9658;" : index + 1 }}
      </h5>
      <img
        style="width:100px;height:60px"
        width="100"
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
  props: { title: String, index: Number, thumbnail: String, active: Number },
  computed: {
    isActive() {
      return this.active === this.index + 1;
    }
  }
};
</script>

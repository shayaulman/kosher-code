<template>
  <a target="_blank" :href="`https://www.youtube.com/c/${customUrl}`" :class="{ 'elevation-high': hover }" class="relative w-64 overflow-hidden rounded-md">
    <img style="width: 320px; height: 150px" :src="thumbnail" alt :class="{ 'zoom-in': hover }" class="transition duration-300 rounded-t-md" />
    <div style="height: 150px" class="relative z-10 w-full px-1 py-3 transition duration-300 bg-custom-bg-card">
      <div v-if="isHebrew" class="absolute left-0 z-20 w-10 rounded israel-icon">
        <israel-flag-icon class="bg-custom-bg-card" />
      </div>
      <h2 :class="{ 'rtl right-0': doesContainHebrewLetters([title]) }" class="p-2 px-3 text-sm font-light text-custom-text-secondary">{{ title }}</h2>
    </div>
    <div class="relative"></div>
    <div class="z-40"></div>
  </a>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
import IsraelFlagIcon from "~/components/UI/IsraelFlagIcon";

export default {
  props: {
    id: String,
    title: String,
    isHebrew: Boolean,
    thumbnail: String,
    customUrl: String,
  },

  components: {
    AppLoader,
    IsraelFlagIcon,
  },

  data() {
    return {
      now: new Date(),
      hover: false,
    };
  },

  methods: {
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some((txt) => HEBREW.test(txt));
    },
  },

  computed: {
    direction() {
      return this.doesContainHebrewLetters([this.title]) ? "rtl" : "ltr";
    },
  },
};
</script>

<style scoped>
.israel-icon {
  top: -17px;
  left: 80%;
}

.zoom-in {
  transform: scale(1.02);
}

.elevation-high {
  transition: 0.3s ease;
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
}
</style>

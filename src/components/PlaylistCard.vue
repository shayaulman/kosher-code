<template>
  <g-link
    @mouseenter.native="hover = true"
    @mouseleave.native="hover = false"
    :to="`video-tutorials/playlists/${name.replace(' ', '-').toLowerCase()}`"
    class="m-3"
  >
    <section
      :class="{ 'elevation-high': hover }"
      class="bg-custom-bg-card w-64 rounded overflow-hidden"
    >
      <div class="relative">
        <img
          style="width: 320px; height: 150px"
          :src="thumbnail"
          height="90"
          class="rounded-t-md bg-black transition duration-300"
        />
        <!-- <div class="absolute bottom-0 right-0 w-full">
          <div
            class="flex w-1/2 justify-center py-1 px-3 bg-custom-brand text-gray-400 text-xs rounded-full"
          >
            רשימת השמעה
            <span class="text-white">{{amountOfVideos}}</span>
          </div>
        </div>-->
      </div>
      <div
        style="height: 150px"
        class="overlay-top relative px-1 py-3 h-16 w-full z-10 pointer-events-none"
      >
        <div
          v-if="isHebrew"
          class="israel-icon w-10 absolute left-0 z-20 rounded"
        >
          <israel-flag-icon class="bg-custom-bg-card" />
        </div>
        <h2
          :class="direction"
          class="p-2 px-3 absolute font-light text-sm text-custom-text-primary Z-40"
        >
          {{ hebrewName || name }}
        </h2>
        <div
          :class="amountDirection"
          class="videos-anount mt-4 flex justify-center items-center h-full text-white z-0 opacity-50"
        >
          <h1 class="z-20 text-3xl text-custom-text-secondary">
            {{ amountOfVideos }}
          </h1>
          <svg
            class="w-16 fill-current text-custom-text-secondary"
            viewBox="0 0 24 24"
          >
            <g>
              <path
                d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
              />
            </g>
          </svg>
        </div>
      </div>
    </section>
  </g-link>
</template>

<script>
// !TODO: component should be merged with `VideoCard`
import AppLoader from "~/components/UI/AppLoader";
import IsraelFlagIcon from "~/components/UI/IsraelFlagIcon";
import { formatDistance } from "date-fns";
import { format } from "date-fns";
import { he } from "date-fns/locale";

export default {
  props: {
    name: String,
    hebrewName: String,
    amountOfVideos: Number,
    isHebrew: Boolean,
    thumbnail: String,
  },

  components: {
    AppLoader,
    IsraelFlagIcon,
  },

  data() {
    return {
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
      return this.hebrewName.length === 0 ? "left-0" : "right-0";
    },

    publishTime() {
      const formattedDate = new Date(this.pubDate);
      return format(formattedDate, "MM/dd/yy");
    },

    textDirection() {
      return this.doesContainHebrewLetters([this.name]) ? "rtl" : "ltr";
    },

    amountDirection() {
      return this.hebrewName.length === 0 ? "right-0" : "left-0";
    },
  },
};
</script>

<style scoped>
.israel-icon {
  top: -17px;
  left: 80%;
}
.elevation-high {
  transition: 0.3s ease;
  transform: translateY(-1px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0 8px 16px rgba(0, 0, 0, 0.24);
}
</style>

<template>
  <g-link :to="`video-tutorials/playlists/${name.replace(' ', '-').toLowerCase()}`" class="m-3">
    <section class="bg-custom-bg-card w-64 rounded overflow-hidden">
      <div class="relative">
        <img
          style="width:320px ;height:150px"
          :src="thumbnail"
          height="90"
          class="rounded-t-md bg-black transition duration-300"
        />
        <div
          class="absolute bottom-0 right-0 w-full "
        >
          <div class="flex w-1/2 justify-center py-1 px-3 bg-custom-brand text-gray-400 text-xs rounded-full">
        רשימת השמעה
            <span class="text-white">{{amountOfVideos}}</span>
          </div>
        </div>
      </div>
      <div style="height: 150px;" class="overlay-top h-16 w-full z-10 pointer-events-none">
        <h2
          :class="direction"
          class="p-2 px-3 font-light text-sm text-custom-text-primary Z-40"
        >{{ hebrewName || name }}</h2>
        <div :class="amountDirection" class="videos-anount text-white z-0">
          <h1 class="z-20">{{ amountOfVideos }}</h1>
          <svg class="w-8" viewBox="0 0 24 24" fill="white">
            <g>
              <path
                d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
              />
            </g>
          </svg>
        </div>
      </div>

      <div v-if="isHebrew" class="w-6 mr-1 right-0 z-20 overflow-hidden shadow-lg">
        <israel-flag-icon />
      </div>
    </section>
  </g-link>
</template>

<script>
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
    thumbnail: String
  },

  components: {
    AppLoader,
    IsraelFlagIcon
  },

  methods: {
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some(txt => HEBREW.test(txt));
    }
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
    }
  }
};
</script>

<style scoped>
.videos-amount {
  top: 50%;
  left: 50%;
}
</style>

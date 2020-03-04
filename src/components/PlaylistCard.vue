<template>
  <section class="relative w-56 mx-2 my-8">
    <g-link :to="`video-tutorials/playlists/${name}`">
      <div class="relative">
        <div
          class="flex flex-col justify-center items-center text-white absolute top-0 right-0 w-1/2 min-h-full bg-black z-20 opacity-85"
        >
          <h1 class="z-20">{{ amountOfVideos }}</h1>
          <svg class="w-8" viewBox="0 0 24 24" fill="white">
            <g>
              <path
                d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
              ></path>
            </g>
          </svg>
        </div>
        <div class="absolute top-0 w-full flex justify-center z-0">
          <app-loader />
        </div>
        <div
          v-if="isHebrew"
          class="w-6 mr-1 absolute top-0 right-0 z-20 overflow-hidden shadow-lg"
        >
          <israel-flag-icon />
        </div>
        <g-image
          style="width:224px;height:120px"
          :src="thumbnail"
          height="90"
          class="relative z-10"
        />
      </div>
    </g-link>
  </section>
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
    publishTime() {
      const formattedDate = new Date(this.pubDate);
      return format(formattedDate, "MM/dd/yy");
    },

    direction() {
      return this.doesContainHebrewLetters([this.name]) ? "rtl" : "ltr";
    }
  }
};
</script>

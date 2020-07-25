<template>
  <g-link
    @mouseenter.native="hover=true"
    @mouseleave.native="hover=false"
    :to="`video-tutorials/${category}/${id}`"
    class="m-2"
  >
    <section :class="{'elevation-high': hover}" class="relative w-64 rounded-md overflow-hidden">
      <img
        style="width:320px;height:150px"
        :src="thumbnail"
        alt
        :class="{'zoom-in': hover}"
        class="rounded-t-md transition duration-300"
      />
      <div
        style="height: 150px;"
        class="relative px-1 py-3 w-full bg-custom-bg-card z-10 transition duration-300"
      >
        <div v-if="isHebrew" class="israel-icon w-10 absolute left-0 z-20 rounded">
          <israel-flag-icon />
        </div>
        <h2
          :class="{ 'rtl right-0': doesContainHebrewLetters([title]) }"
          class="p-2 px-3 font-light text-sm text-custom-text-secondary"
        >{{ formattedTitle }}</h2>
        <p
          class="absolute bottom-0 p-2 px-3 text-xxs font-hairline text-custom-text-3"
        >{{ publishTime }}</p>
      </div>
      <div class="relative"></div>
      <div class="z-40"></div>
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
    id: String,
    title: String,
    pubDate: String,
    isHebrew: Boolean,
    category: String,
    thumbnail: String,
    color: String,
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
    formattedTitle() {
      const titleLength = this.title.split(" ").length;
      if (titleLength < 6) {
        return this.title;
      }
      return this.title;
      // .split(" ")
      // .slice(0, 13)
      // .join(" ") + "..."
    },
    publishTime() {
      const formattedDate = new Date(this.pubDate);
      // return formatDistance(formattedDate, this.now, {
      //   addSuffix: true,
      //   locale: he
      // });
      return format(formattedDate, "MM/dd/yy");
    },

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

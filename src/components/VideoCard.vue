<template>
  <g-link :to="`video-tutorials/${category}/${id}`" class="m-2">
    <section
      style="height: 160px;"
      class="relative  w-64 rounded-md overflow-hidden"
    >
      <img
        style="width:320px;height:160px"
        :src="thumbnail"
        alt=""
        class="opacity-75 rounded-md hover:opacity-100 transition duration-300"
      />
      <div
        class="overlay-top absolute top-0 h-16 w-full z-10 pointer-events-none"
      >
        <h2
          :class="{ 'rtl right-0': doesContainHebrewLetters([title]) }"
          class="absolute top-0 p-2 px-3 font-light text-sm text-custom-text-primary"
        >
          {{ formattedTitle }}
        </h2>
      </div>
      <div
        class="overlay-bottom absolute bottom-0 h-12 w-full z-10 pointer-events-none"
      >
        <p
          class="absolute bottom-0 p-2 px-3 text-xxs font-hairline text-gray-500"
        >
          {{ publishTime }}
        </p>
      </div>

      <div class="relative">
        <!-- <div class="absolute top-0 w-full flex justify-center -z-10">
          <app-loader :color="color" />
        </div> -->
        <div
          v-if="isHebrew"
          class="w-6 m-1 absolute bottom-0 right-0 opacity-75 z-20 overflow-hidden shadow-lg"
        >
          <israel-flag-icon />
        </div>
      </div>
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
    color: String
  },

  components: {
    AppLoader,
    IsraelFlagIcon
  },

  data() {
    return {
      now: new Date()
    };
  },

  methods: {
    doesContainHebrewLetters(textArr) {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return textArr.some(txt => HEBREW.test(txt));
    }
  },

  computed: {
    formattedTitle() {
      const titleLength = this.title.split(" ").length;
      if (titleLength < 6) {
        return this.title;
      }
      return (
        this.title
          .split(" ")
          .slice(0, 7)
          .join(" ") + "..."
      );
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
    }
  }
};
</script>

<style scoped>
.overlay-top {
  background: linear-gradient(0deg, transparent, var(--bg-card) 100%);
}

.overlay-bottom {
  background: linear-gradient(0deg, var(--bg-card), transparent 100%);
}
</style>

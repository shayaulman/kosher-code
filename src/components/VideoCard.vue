<template>
  <section
    :style="`border-top: 2px solid ${color}`"
    class="relative w-56 mx-2 my-8"
  >
    <g-link :to="`video-tutorials/${category}/${id}`">
      <div class="relative">
        <div
          :style="`background: ${color}`"
          class="absolute top-0 w-full flex justify-center z-0"
        >
          <app-loader :color="color" />
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
      <div>
        <h2
          :class="{ rtl: doesContainHebrewLetters([title]) }"
          class="pt-2 pb-6 text-custom-text-primary text-xs"
        >
          {{ formattedTitle }}
        </h2>
        <p class="absolute bottom-0 right-0 text-custom-text-3 text-xxs">
          {{ publishTime }}
        </p>
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
      if (titleLength < 8) {
        return this.title;
      }
      return (
        this.title
          .split(" ")
          .slice(0, 9)
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

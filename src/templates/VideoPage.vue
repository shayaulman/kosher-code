<template>
  <Layout dontShowFooter>
    <section :style="`direction: ${direction}`" class="m-3">
      <section class=" relative flex">
        <div
          class="video-container relative w-full h-full float-left bg-black container rounded-md overflow-hidden shadow-lg"
        >
          <div class="absolute z-0 inset-0 flex items-center justify-center">
            <app-loader youtube />
          </div>
          <iframe
            class="relative z-10"
            :src="`https://www.youtube.com/embed/${$context.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <h4 class="mt-3 text-xs text-custom-text-3">{{ formattedTime }}</h4>
      <section style="width:640px" class="my-3">
        <h1 class="my-1 py-2 text-custom-text-primary text-lg">
          {{ $context.title }}
        </h1>
        <p class="text-custom-text-3 text-sm font-thin">
          {{ $context.description }}
        </p>
      </section>
    </section>
  </Layout>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
export default {
  components: {
    AppLoader
  },
  computed: {
    isHebrew() {
      const HEBREW = RegExp("[\u0590-\u05FF]");
      return HEBREW.test(this.$context.title);
    },
    direction() {
      return this.isHebrew ? "rtl" : "ltr";
    },

    formattedTime() {
      const d = new Date(this.$context.publishedAt);
      return d.toDateString();
    }
  }
};
</script>

<style scoped>
.video-container {
  overflow: hidden;
  position: relative;
  width: 75%;
}

.video-container::after {
  padding-top: 56.25%;
  display: block;
  content: "";
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

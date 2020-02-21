<template>
  <Layout>
    <section :style="`direction: ${direction}`" class="m-3">
      <section class=" relative flex">
        <div
          style="height:385px; width:640px"
          class="relative w-full h-full float-left bg-black container rounded-md overflow-hidden shadow-lg"
        >
          <div class="absolute z-0 inset-0 flex items-center justify-center">
            <app-loader youtube />
          </div>
          <iframe
            class="relative z-10"
            width="640"
            height="385"
            :src="`https://www.youtube.com/embed/${$context.id}`"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </section>
      <section style="width:640px" class="my-3">
        <h1 class="my-1 py-2 text-green-500 text-lg">{{ $context.title }}</h1>
        <p class="text-gray-300 font-thin">{{ $context.description }}</p>
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
    }
  }
};
</script>

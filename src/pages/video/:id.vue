<template>
  <Layout>
    <section class="m-6 relative flex">
      <div
        style="height:428px; width:740px"
        class="bg-black container rounded-md overflow-hidden shadow-lg"
      >
        <div class="absolute z-0 inset-auto">
          <app-loader />
        </div>
        <iframe
          class="relative z-10"
          width="740"
          height="428"
          :src="`https://www.youtube.com/embed/${id}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </section>
  </Layout>
</template>

<script>
import AppLoader from "~/components/UI/AppLoader";
export default {
  data() {
    return {
      id: this.$route.params.id
    };
  },
  props: {
    someInfo: String
  },
  components: {
    AppLoader
  }
};
</script>

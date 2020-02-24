<template>
  <Layout>
    <section class="flex flex-col items-center">
      <label class="m-6 text-custom-text-primary text-center"
        >הכנס את ה-URL של הסרטון (באורך של 11 תווים) בכדי לבדוק אם זה קיים
        במאגר</label
      >
      <div class="flex justify-center">
        <input
          class="ml-1 p-3 bg-custom-text-3 rounded"
          v-model="url"
          type="text"
          @keyup.enter="checkVideo(url)"
        />
        <button
          class="mr-1 py-2 px-4 text-custom-text-primary bg-custom-brand rounded"
          @click="checkVideo(url)"
        >
          בדוק
        </button>
      </div>
    </section>
    <div class="flex flex-col">
      <div class="flex justify-center">
        <h1 class="m-3 text-custom-brand" v-if="videoExists.length > 0">
          הסרטון נמצא בקטגוריה של {{ videoExists[0].node.category }}!
        </h1>
        <div
          v-else-if="videoExists.length === 0"
          class="p-2 text-center text-custom-text-secondary"
        >
          <h1>הסרטון <span class="text-red-700">אינו</span> קיים במאגר</h1>
          <p class="mt-2">וודא אם הסרטון אינו חסום 👇</p>
        </div>
      </div>

      <section
        v-if="videoExists.length === 0"
        class="flex flex-col items-center"
      >
        <iframe
          v-if="showVideo"
          class="relative z-10"
          :src="`https://www.youtube.com/embed/${url}`"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <h2 class="m-3 text-xs text-custom-text-secondary">
          אם הסרטון פתוח הוסף את זה תחת הקטגוריה המתאימה!
        </h2>
      </section>
    </div>
  </Layout>
</template>

<page-query>
query {
 allVideo  {
    edges {
      node {
        id
        category
      }
    }
  }
}
 </page-query>

<script>
export default {
  data() {
    return {
      url: "",
      videoExists: false,
      showVideo: false
    };
  },

  methods: {
    checkVideo(videoUrl) {
      this.videoExists = this.$page.allVideo.edges.filter(
        edge => edge.node.id === videoUrl
      );
      this.showVideo = true;
    }
  },
  mounted() {
    console.log(this.$page.allVideo.edges);
  }
};
</script>

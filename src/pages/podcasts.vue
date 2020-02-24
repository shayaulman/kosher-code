<template>
  <Layout>
    <div class="flex justify-center"><podcast-icon /></div>
    <section class="flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">
        ידוע לכם על פודקאסט בנושאי תכנות שפתוח בנטפרי (אנגלית או עברית)?
      </h1>
      <g-link to="/contact">
        <button
          class="px-5 py-1 text-custom-text-3 bg-custom-brand rounded-full"
        >
          שלחו לנו
        </button>
      </g-link>
      <h3 class="p-2 text-custom-text-3">ונכניס את זה למאגר!</h3>
    </section>
  </Layout>
</template>

<script>
import PodcastIcon from "~/components/UI/PodcastIcon";
export default {
  components: { PodcastIcon }
};
</script>

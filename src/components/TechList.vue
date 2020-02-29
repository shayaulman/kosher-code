<template>
  <section>
    <tech-category
      v-for="category in listOfCategories"
      :key="category.en"
      :category="category.en"
      :hebrew-name="category.he"
    />
  </section>
</template>

<script>
import TechCategory from "~/components/TechCategory";
export default {
  components: {
    TechCategory
  },

  data() {
    return {
      listOfCategories: [
        { en: "programming language", he: "שפות תכנות" },
        { en: "framework", he: "פריימוורקים שונים" },
        { en: "special topics", he: "נושאים מיוחדים" }
      ]
    };
  }
};
</script>

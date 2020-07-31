<template>
  <Layout>
    <section class="flex flex-col items-center">
      <h1 class="mt-8 p-4 text-custom-text-primary">ידוע לכם על בלוג מקצועי מוצלח (בעברית)?</h1>
      <g-link to="/contact">
        <button class="px-5 py-1 text-custom-text-secondary bg-custom-brand rounded-full">שלחו לנו</button>
      </g-link>
      <h3 class="p-2 text-custom-text-3">ונכניס את זה למאגר!</h3>
    </section>
    <div v-for="blog in blogsSorted" :key="blog.name">
      <blog-card v-bind="blog.node" />
    </div>
  </Layout>
</template>

<page-query>
{
  blog: allBlog {
    edges {
      node {
        name
        desc,
        author,
        link,
        logo
      }
    }
  }
}
 </page-query>

<script>
import BlogCard from "~/components/BlogCard";
export default {
  name: "blogs",
  components: { BlogCard },
  computed: {
    blogsSorted() {
      return this.$page.blog.edges;
    },
  },
};
</script>
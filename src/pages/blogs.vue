<template>
  <Layout>
    <h3
      class="inline-block rounded-full py-2 px-4 text-custom-text-secondary text-xs bg-custom-bg-card shadow-outline"
    >הדף בבנייה</h3>
    <h3 class="mt-8 text-lg text-center text-custom-yellow-1">בלוגים בעברית</h3>
    <div class="ltr max-w-4xl mx-auto my-6 flex flex-wrap justify-center items-center">
      <blog-card v-for="blog in blogsHebrew" :key="blog.name" v-bind="blog.node" />
    </div>
    <h3 class="mt-16 text-lg text-center text-custom-yellow-1">בלוגי Medium</h3>
    <div class="ltr max-w-4xl mx-auto my-6 flex flex-wrap justify-center items-center">
      <blog-card v-for="blog in blogsMedium" :key="blog.name" v-bind="blog.node" />
    </div>
    <section class="flex flex-col items-center mb-8">
      <h1 class="mt-8 p-4 text-custom-text-primary">ידוע לכם על בלוג מקצועי מוצלח (בעברית)?</h1>
      <g-link to="/contact">
        <button class="px-5 py-1 text-custom-text-secondary bg-custom-brand rounded-full">שלחו לנו</button>
      </g-link>
      <h3 class="p-2 text-custom-text-3">ונכניס את זה למאגר!</h3>
    </section>
  </Layout>
</template>

<page-query>
{
  blog: allBlog {
    edges {
      node {
        name
        desc,
        link,
        color,
        isHebrew,
        isMedium
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
    blogsHebrew() {
      return this.blogsSorted.filter((blog) => blog.node.isHebrew);
    },
    blogsMedium() {
      return this.blogsSorted.filter((blog) => blog.node.isMedium);
    },
  },
  mounted() {
    console.log(this.blogsSorted, this.blogsHebrew);
  },
};
</script>
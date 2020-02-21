<template>
  <header
    class="sticky top-0 py-6 px-12 flex justify-between items-center bg-custom-bg-header border-t-4 border-custom-green-1 shadow-lg z-30"
  >
    <g-link to="/" class="text-xl text-center text-custom-green-1 font-thin"
      ><span class="text-custom-green-1 font-bold">{</span> מאגר למתכנת
      <span class="text-custom-green-1 font-bold">}</span></g-link
    >
    <div class="flex">
      <g-link class="mx-3 text-gray-400" to="/">בית</g-link>
      <g-link class="mx-3 text-gray-400" to="/blogs">בלוגים</g-link>
      <g-link class="mx-3 text-gray-400" to="/podcasts">פודקאסטים</g-link>
    </div>
  </header>
</template>

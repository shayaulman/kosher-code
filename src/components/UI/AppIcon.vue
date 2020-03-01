<template>
  <section v-if="logo" class="p-2 w-18">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="icons[logo].vwb"
      v-html="icons[logo].path"
    />
  </section>
</template>

<script>
import icons from "~/assets/icons/SvgIcons";
export default {
  name: "Icon",
  props: { icon: String, hasNotIcon: Boolean },
  data() {
    return {
      icons,
      logo: ""
    };
  },

  mounted() {
    if (Object.keys(this.icons).includes(this.icon)) {
      this.logo = this.icon;
    }
    //  this.icons this.logo
  }
};
</script>

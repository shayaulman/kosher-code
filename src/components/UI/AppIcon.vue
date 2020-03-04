<template>
  <section v-if="logo">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :viewBox="icons[icon].vwb"
      v-html="icons[icon].path"
    />
  </section>
</template>

<script>
import icons from "~/assets/icons/SvgIcons";
export default {
  name: "Icon",
  props: { icon: String },
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
  }
};
</script>

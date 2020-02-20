<template>
  <section>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      v-html="icons[icon]"
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
      icons
    };
  }
};
</script>

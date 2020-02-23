<template>
  <section class="relative block text-center w-full">
    <transition-group name="rotate" class="text-3xl text-custom-brand">
      <div v-show="currentText == 0" key="0">
        סרטוני הדרכה
      </div>
      <div v-show="currentText == 1" key="1">
        בלוגים בעברית
      </div>
      <div v-show="currentText == 2" key="2">
        פודקאסטים
      </div>
      <div v-show="currentText == 3" key="3">
        SubReddits
      </div>
    </transition-group>
  </section>
</template>

<script>
export default {
  data() {
    return {
      currentText: 0
    };
  },
  mounted() {
    ($vm => {
      (function animate() {
        $vm._counter = setTimeout(() => {
          $vm.currentText = ($vm.currentText + 1) % 4;
          requestAnimationFrame(animate);
        }, 2000);
      })();
    })(this);
  },
  destroyed() {
    clearTimeout(this._counter);
  }
};
</script>

<style scoped>
.rotate-enter-active {
  transition: color 1s, opacity 1s,
    transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  transform: translateY(10px);
  opacity: 0;
}
.rotate-leave-active {
  transition: opacity 0.6s, transform 1s cubic-bezier(0.785, 0.135, 0.15, 0.86);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
}
.rotate-enter-to {
  transform: translateY(0);
  opacity: 1;
}
.rotate-leave-to {
  transform: translateY(-0px);
  opacity: 0;
}
</style>

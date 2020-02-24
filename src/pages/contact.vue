<template>
  <Layout>
    <section class="rtl max-w-3xl mx-auto">
      <form
        name="contact"
        method="post"
        v-on:submit.prevent="handleSubmit"
        action="/Success/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="contact" />
        <p hidden>
          <label>
            Donâ€™t fill this out:
            <input name="bot-field" />
          </label>
        </p>
        <div class="sender-info">
          <div>
            <!-- <label for="name" class="label" >Your name</label> -->
            <input
              type="text"
              name="name"
              v-model="formData.name"
              placeholder="Name"
            />
          </div>
          <div>
            <!-- <label for="email">Your email</label> -->
            <input
              type="email"
              name="email"
              v-model="formData.email"
              placeholder="E-Mail"
            />
          </div>
        </div>

        <div class="message-wrapper">
          <!-- <label for="message">Message</label> -->
          <textarea
            name="message"
            v-model="formData.message"
            placeholder="Message"
          ></textarea>
          <button type="submit">
            <span class="mdc-button__label">Send!</span>
          </button>
        </div>
      </form>
    </section>
  </Layout>
</template>

<script>
export default {
  metaInfo: {
    title: "Contact"
  },
  components: {},
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          ...this.formData
        })
      })
        .then(() => this.$router.push("/Success/"))
        .catch(error => alert(error));
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  margin-top: 8vh;
}
input,
textarea {
  @apply p-3 w-full text-gray-700 rounded bg-custom-text-3 border-none;
}

.message-wrapper {
  position: relative;

  button {
    position: absolute;
    bottom: 15px;
    right: 15px;
    border-radius: 5px;
    padding: 6px 14px;
    font-family: var(--font-3);
    background-color: var(--color-3);
    color: var(--text-main);
    font-size: 16px;
    border: none;

    &:hover {
      cursor: pointer;
      @extend .animated-background;
    }

    &:focus {
      outline: none;
    }
  }
}

textarea {
  @apply mt-1 h-72;
}

.sender-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(185px, 1fr));
  grid-gap: 6px;
}

.animated-background {
  animation-duration: 0.7s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-name: placeHolderShimmer;
  animation-timing-function: linear;
  background: #f6f6f6;
  background: linear-gradient(
    to right,
    var(--color-3-op) 8%,
    var(--color-3) 18%,
    var(--color-3) 33%
  );
  background-size: 800px 104px;
  // height: 96px;
  // position: relative;
}
</style>

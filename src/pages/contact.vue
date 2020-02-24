<template>
  <Layout>
    <section class="rtl max-w-3xl mx-auto">
      <form
        name="contact"
        method="post"
        v-on:submit.prevent="handleSubmit"
        action="/success/"
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
              placeholder="שם"
            />
          </div>
          <div>
            <!-- <label for="email">Your email</label> -->
            <input
              type="email"
              name="email"
              v-model="formData.email"
              placeholder="אי-מייל"
            />
          </div>
        </div>

        <div class="message-wrapper">
          <!-- <label for="message">Message</label> -->
          <textarea
            name="message"
            v-model="formData.message"
            placeholder="הודעה"
          ></textarea>
          <button
            type="submit"
            class="bg-custom-brand hover:opacity-75 transition duration-300"
          >
            <span class="mdc-button__label ">שלח!</span>
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
        .then(() => this.$router.push("/success/"))
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
  @apply text-custom-text-primary p-3 w-full rounded bg-custom-bg-card border-none;
}

::placeholder {
  @apply text-custom-text-primary;
}

.message-wrapper {
  position: relative;

  button {
    position: absolute;
    bottom: 15px;
    left: 15px;
    border-radius: 5px;
    padding: 6px 14px;
    font-family: var(--font-3);

    border: none;

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
</style>

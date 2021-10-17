<template>
  <CopyToClipboard :text="text" @copy="copyHandler">
    <button ref="button" :class="classes" :title="title">
      <slot />
    </button>
  </CopyToClipboard>
</template>

<script>
import CopyToClipboard from 'vue-copy-to-clipboard';

export default {
  components: {
    CopyToClipboard,
  },
  props: {
    classes: {
      type: String,
      default: '',
    },
    text: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },

  methods: {
    copyHandler: function (text, result) {
      this.$refs.button.classList.toggle('opacity-50');
      setTimeout(() => {
        this.$refs.button.classList.toggle('opacity-50');
      }, 500);
    },
  },
};
</script>


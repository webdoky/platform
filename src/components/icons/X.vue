<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="`${size}em`"
    :height="`${size}em`"
    :class="this.class"
    fill="currentColor"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z"
    />
  </svg>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 1,
    },
    class: {
      type: String,
      default: '',
    },
  },
};
</script>


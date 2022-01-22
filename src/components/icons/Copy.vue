<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="`${size}em`"
    :height="`${size}em`"
    :class="className"
    fill="currentColor"
  >
    <path fill="none" d="M0 0h24v24H0z" />
    <path
      d="M7 6V3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-3v3c0 .552-.45 1-1.007 1H4.007A1.001 1.001 0 0 1 3 21l.003-14c0-.552.45-1 1.007-1H7zM5.003 8L5 20h10V8H5.003zM9 6h8v10h2V4H9v2z"
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
    className: {
      type: String,
      default: '',
    },
  },
};
</script>


<template>
  <g-link
    :to="`${page.path}`"
    class="flex items-center py-1 font-semibold relative"
  >
    <span
      class="
        absolute
        w-2
        h-2
        -ml-3
        rounded-full
        opacity-0
        bg-ui-primary
        transition
        transform
        scale-0
        origin-center
      "
      :class="{
        'opacity-100 scale-100': isCurrent,
      }"
    ></span>
    {{ page.title }}
  </g-link>
</template>

<script>
export default {
  props: ['page', 'isCurrent'],
};
</script>

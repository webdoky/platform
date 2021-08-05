<template>
  <div>
    <h3
      class="pt-0 mt-0 mb-1 text-sm tracking-tight uppercase border-none"
      @click="isExpanded = !isExpanded"
    >
      <div class="inline-block align-middle">
        <ChevronDownIcon v-if="isExpanded" size="1.35x" />
        <ChevronRightIcon v-else size="1.35x" />
      </div>
      <slot name="header" />
    </h3>
    <div
      class="pl-3 overflow-hidden"
      :class="{ 'max-h-full': isExpanded, 'max-h-0': !isExpanded }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { ChevronRightIcon, ChevronDownIcon } from 'vue-feather-icons';

export default {
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
  },
  props: ['expanded'],
  data() {
    return {
      isExpanded: this.expanded ?? false,
    };
  },
};
</script>

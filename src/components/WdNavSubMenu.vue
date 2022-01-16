<template>
  <div>
    <h3
      v-if="showHeader"
      class="pt-0 mt-0 mb-1 text-sm tracking-tight uppercase border-none"
      @click="isExpanded = !isExpanded"
    >
      <div class="inline-block align-middle">
        <ChevronDownIcon v-if="isExpanded" size="1.5" />
        <ChevronRightIcon v-else size="1.5" />
      </div>
      <slot name="header" />
    </h3>
    <div
      class="pl-4 overflow-hidden"
      :class="{ 'max-h-full': isExpanded, 'max-h-0': !isExpanded }"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import ChevronRightIcon from '@/components/icons/ChevronRight';
import ChevronDownIcon from '@/components/icons/ChevronDown';

export default {
  components: {
    ChevronRightIcon,
    ChevronDownIcon,
  },
  props: {
    expanded: {
      type: Boolean,
      required: true,
    },
    showHeader: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      isExpanded: this.expanded ?? false,
    };
  },
};
</script>

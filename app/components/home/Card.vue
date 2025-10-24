<template>
  <div
    class="rounded-3xl flex flex-col hover:scale-105 duration-200 transition-all overflow-hidden relative"
    :class="[
      paddingClass,
      variantClass,
    ]"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'empty'
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    variant: 'primary',
    size: 'md',
  }
)

const paddingClass = computed(() =>
  ({
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6',
  })[props.size]
)

const variantClass = computed(() =>
  ({
    primary: 'bg-primary',
    secondary: 'bg-muted',
    empty: 'bg-transparent',
  })[props.variant]
)
</script>
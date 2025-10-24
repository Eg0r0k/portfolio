<script setup lang="ts">
const stack = await queryCollection('stack').first()

const displayedItems = computed(() => (stack?.items || []).slice(0, 4))
const totalItems = computed(() => stack?.items?.length || 0)
const hasMore = computed(() => totalItems.value > 4)
const moreCount = computed(() => totalItems.value - 4)
</script>

<template>
  <HomeCard
    variant="secondary"
    class="col-span-1 row-span-1 aspect-square grid grid-cols-2 grid-rows-2 gap-2"
    style="--stagger: 2"
    data-animate
  >
    <template v-for="(item, index) in displayedItems" :key="item.name">
      <div
        v-if="index < 4"
        class="bg-card rounded-lg flex items-center justify-center"
      >
        <UIcon
          :name="item.icon"
          class="size-6"
          :aria-label="item.name"
        />
      </div>
    </template>

    <div
      v-for="i in Math.max(0, 4 - displayedItems.length)"
      :key="`empty-${i}`"
      class="bg-card/30 rounded-lg"
    />

    <div
      v-if="hasMore"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div class="flex items-center justify-center">
        <div class="bg-primary rounded-full size-6 font-ndot flex items-center justify-center text-xs font-bold">
          +{{ moreCount }}
        </div>
      </div>
    </div>
  </HomeCard>
</template>

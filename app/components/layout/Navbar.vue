<script lang="ts" setup>
defineProps({
  isText: {
    type: Boolean,
    default: false,
  },
})

const navigation = getNavigation('home') as Record<string, Navigation>
const route = useRoute()
const localePath = useLocalePath()
</script>

<template>
  <div class="mx-auto my-2 flex w-full items-center justify-center">
    <header>
      <nav class="flex rounded-xl gap-1 ">
        <NuxtLink
          v-for="item in navigation"
          :id="item.name.toLowerCase()"
          :key="item.name"
          :aria-label="item.name + ' navigation link'"
          :to="localePath(item.to)"
          class="group flex bg-muted items-center transition-all duration-200 border rounded border-transparent px-2.5 py-3 sm:px-6"
          :class="[
            localePath(item.to) === route.path
              ? 'text-shadow-sm shadow-[0_0_8px_0_var(--color-orange-400)]'
              : 'hover:bg-elevated text-toned'
          ]"
        >
          <div class="bg-elevated p-1.5 flex items-center rounded-full">
            <UIcon
              :name="item.icon"
              class="size-7  font-light sm:size-6"
            />
          </div>
        </NuxtLink>
      </nav>
    </header>
  </div>
</template>

<style scoped>
nav > :first-child {
  border-top-left-radius: var(--radius-xl);
  border-bottom-left-radius: var(--radius-xl);
}

nav > :last-child {
  border-top-right-radius:var(--radius-xl);
  border-bottom-right-radius: var(--radius-xl);
}
</style>

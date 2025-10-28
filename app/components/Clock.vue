<template>
  <div class="clock-container">
    <ClientOnly>
      <div class="clock">
        <div class="hand hour" :style="{ transform: `rotate(${hourAngle}deg)` }" />
        <div class="hand minute" :style="{ transform: `rotate(${minuteAngle}deg)` }" />
        <div class="hand second" :style="{ transform: `rotate(${secondAngle}deg)` }">
          <div class="second-tip" />
        </div>
        <div class="center-dot" />
      </div>
      <template #fallback>
        <USkeleton class="w-full h-full rounded-full" />
      </template>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const now = ref(new Date())

const hourAngle = computed(() => {
  const h = now.value.getHours() % 12
  const m = now.value.getMinutes()
  return h * 30 + m * 0.5
})

const minuteAngle = computed(() => {
  const m = now.value.getMinutes()
  const s = now.value.getSeconds()
  return m * 6 + s * 0.1
})

const secondAngle = computed(() => {
  const s = now.value.getSeconds()
  const ms = now.value.getMilliseconds()
  return s * 6 + ms * 0.006
})

let timer: NodeJS.Timeout | null = null

onMounted(() => {
  now.value = new Date()
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped>
.clock-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.clock {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 200px;
  max-height: 200px;
  border-radius: 50%;
  background: var(--ui-bg-muted);
}

.hand {
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform: translateX(-50%);
  transform-origin: bottom center;
}

.hour {
  width: 4px;
  height: 35%;
  background: var(--ui-text);
  opacity: 0.9;
}

.minute {
  width: 3px;
  height: 45%;
  background: var(--ui-text);
  opacity: 0.9;
}

.second {
  width: 1.5px;
  height: 45%;
  background: var(--ui-bg-accented);
  opacity: 0.9;
  transition: transform 0.05s cubic-bezier(0.4, 2.3, 0.2, 1);
}

.center-dot {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: var(--ui-bg-accented);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.second-tip {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 6px;
  height: 6px;
  background: var(--ui-bg-accented);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.9;
}
</style>

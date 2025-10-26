<script setup lang="ts">
// Маппинг соцсетей — только те, что нужны (можно расширить)
const socialMediaMap = [
  { regex: /github\.com/i, icon: 'custom:github' },
  { regex: /x\.com|twitter\.com/i, icon: 'custom:x' },
  { regex: /spotify\.com/i, icon: 'custom:spotify' },
  { regex: /t\.me|telegram\.org/i, icon: 'bx:bxl-telegram' },
]

// Получаем ссылки из app.config
const { socials } = useAppConfig()

// Берём первые 4 значения (гарантируем длину = 4)
const socialLinks = Object.values(socials).slice(0, 4)

// Валидация: если меньше 4 — кидаем ошибку (или можно заполнить заглушками)
if (socialLinks.length < 4) {
  throw new Error(
    `Expected 4 social links in app.config, but got ${socialLinks.length}.`,
  )
}

const mappedSocials = socialLinks.map((link) => {
  const match = socialMediaMap.find(({ regex }) => regex.test(link))
  if (!match) {
    console.warn(`Unknown social link: ${link}. Using fallback icon.`)
    return { link, icon: 'bx:bx-link' }
  }
  return { link, icon: match.icon }
})
</script>

<template>
  <HomeCard
    variant="secondary"
    class="col-span-2 row-span-2 aspect-square grid grid-cols-2 grid-rows-2 gap-4"
  >
    <a
      v-for="(social, index) in mappedSocials"
      :key="index"
      :href="social.link"
      target="_blank"
      rel="noopener noreferrer"
      class="border rounded-full flex items-center justify-center transition-colors hover:bg-muted-foreground/5"
    >
      <UIcon
        :name="social.icon"
        class="size-8"
      />
    </a>
  </HomeCard>
</template>

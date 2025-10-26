<template>
  <section class="relative pt-12">
    <div class="relative mx-auto flex max-w-7xl flex-col justify-center gap-4 px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
      <!-- <div
        class="absolute -top-8 left-1/2 size-72 -translate-x-1/2 rounded-full bg-accented/20 blur-[120px] lg:-top-8 lg:size-128 lg:blur-[200px]" /> -->
      <!-- profile picture -->

      <div class="grid  grid-cols-[repeat(auto-fill,minmax(90px,1fr))] max-w-full gap-4 mb-10">
        <HomeProfilePicture class="row-span-2 col-span-2 aspect-square" />
        <HomeCard
          style="--stagger: 1"
          data-animate
          variant="secondary"
          class="aspect-square flex flex-col items-center justify-center p-4"
        >
          <span class="font-geist text-5xl font-bold tracking-tight mb-1 ">3</span>
          <span class="text-sm font-ndot text-muted-foreground ">years</span>
        </HomeCard>
        <HomeCard
          style="--stagger: 1"
          data-animate
          class="col-span-3 row-span-2 font-ndot gap-4"
        >
          <span class="text-xl mb-auto">Frontend Developer</span>
          <span class="text-5xl tracking-widest">Vue/Nuxt</span>
          <span class=" absolute right-4 size-2 bg-muted rounded-full" />
        </HomeCard>
        <HomeStack />
        <HomeCard
          style="--stagger: 2"
          data-animate
          variant="cristal"
          class="col-span-1 row-span-1 aspect-square flex flex-col items-center justify-center p-3 text-center font-ndot"
        >
          <UIcon
            name="pixelarticons:home"
            class="size-5 mb-1"
          />
          <span class="text-xs">Remote</span>
          <span class="text-xs">Full-time</span>
        </HomeCard>

        <HomeCard
          class="col-span-1 row-span-1 aspect-square "
          variant="empty"
        />
        <HomeSocial
          style="--stagger: 3"
          data-animate
        />
        <Clock
          style="--stagger: 5"
          data-animate
          class="col-span-2 row-span-2 aspect-square"
        />
        <SettingsAvailability
          style="--stagger: 2"
          data-animate
          class="col-span-3 row-span-1 min-h-[100px]"
        />
        <HomeCard
          class="col-span-3 row-span-1  sm:flex hidden"
          variant="empty"
        />

        <HomeCard
          style="--stagger: 4"
          data-animate
          variant="primary"
          class="rounded-full items-center aspect-square justify-center"
        >
          <UIcon
            name="custom:snow"
            class="size-12"
          />
        </HomeCard>
      </div>

      <div class="z-20 flex flex-col items-center justify-center">
        <div
          class="font-geist"
          style="--stagger: 3; --delay: 20ms"
          data-animate
        >
          <h1
            class=" font-medium  text-pretty bg-gradient-to-b from-white/90 to-white/30 bg-clip-text text-3xl text-transparent lg:max-w-3xl lg:text-4xl"
          >
            <slot
              name="hero_title"
              mdc-unwrap="p"
            />
          </h1>
          <h2 class="mt-4 max-w-xl  text-lg antialiased text-white/60">
            <slot
              name="hero_subtitle"
              mdc-unwrap="p"
            />
          </h2>
        </div>

        <div
          style="--stagger: 5"
          data-animate
          class="mt-12 flex w-full max-w-3xl flex-col gap-4 lg:mt-16"
        >
          <HomeProjects />
        </div>
        <Divider class="my-9" />
        <HomeFaq
          style="--stagger: 6"
          data-animate
        />
      </div>
    </div>
  </section>
</template>

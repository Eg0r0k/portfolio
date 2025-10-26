export default defineAppConfig({
  global: {
    meetingLink: 'https://cal.com/hugorcd/15min',
    available: true,
  },
  profile: {
    name: 'Egor Bocharov',
    job: 'Frontend Developer',
    email: 'lambdawork1n@gmail.com',
    telegram: 'EG0RK13',
    picture: 'https://avatars.githubusercontent.com/u/123271525?v=4',
  },
  socials: {
    github: 'https://github.com/Eg0r0k',
    twitter: 'https://twitter.com/HugoRCD__',
    telegram: 'https://t.me/EGORK13',
    spotify: 'https://open.spotify.com/user/31r6b5oz2ouj2zyerfaec3re6gq4',
  },
  seo: {
    title: 'Eg0r0k\'s portfolio',
    description: 'My way',
    url: 'https://canvas.hrcd.fr',
  },
  ui: {
    colors: {
      primary: 'orange',
      neutral: 'neutral',
      error: 'red',
    },
    notifications: {
      position: 'top-0 bottom-auto',
    },
    notification: {
      progress: {
        base: 'absolute bottom-0 end-0 start-0 h-0',
        background: 'bg-transparent dark:bg-transparent',
      },
    },
    button: {
      slots: {
        base: 'cursor-pointer',
      },
      // defaultVariants: {
      //   color: 'neutral',
      // },
    },
    input: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    textarea: {
      defaultVariants: {
        color: 'neutral',
      },
    },
    icons: {
      loading: 'lucide:loader',
    },
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
  ],
})

type Where = 'home' | 'app'

export type Navigation = {
  name: string
  to: string
  icon: string
}

export function getNavigation(where: Where): Record<string, Navigation> | [] {
  switch (where) {
    case 'home':
      return {
        home: {
          name: 'Home',
          to: '/',
          icon: 'pixelarticons:home',
        },
        works: {
          name: 'Works',
          to: '/works',
          icon: 'pixelarticons:briefcase',
        },
        writing: {
          name: 'Writing',
          to: '/writing',
          icon: 'pixelarticons:notes',
        },
        about: {
          name: 'About',
          to: '/about',
          icon: 'pixelarticons:user',
        },
        contact: {
          name: 'Contact',
          to: '/contact',
          icon: 'pixelarticons:mail',
        },
      }
    default:
      return []
  }
}

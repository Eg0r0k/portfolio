import { defineCollection, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

const commonContentSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
})

const commonArticleSchema = z.object({
  title: z.string().nonempty(),
  description: z.string().nonempty(),
  date: z.string().nonempty(),
  image: z.string().url(),
  readingTime: z.string().nonempty(),
  tags: z.array(z.string().nonempty()),
})

const commonProjectSchema = z.object({
  name: z.string().nonempty(),
  image: z.string().url(),
  link: z.string().url(),
  release: z.string().nonempty(),
  date: z.string().nonempty(),
  featured: z.boolean().optional(),
})

const commonFaqSchema = z.object({
  title: z.string().nonempty(),
  subtitle: z.string().nonempty(),
  faqQuestions: z.array(
    z.object({
      title: z.string().nonempty(),
      questions: z.array(
        z.object({
          label: z.string().nonempty(),
          content: z.string().nonempty(),
        }),
      ),
    }),
  ),
})

export const collections = {
  content_en: defineCollection(
    asSeoCollection({
      type: 'page',
      source: {
        include: 'en/**/*.md',
        exclude: ['en/articles/*.md'],
        prefix: '/en',
      },
      schema: commonContentSchema,
    }),
  ),
  content_ru: defineCollection(
    asSeoCollection({
      type: 'page',
      source: {
        include: 'ru/**/*.md',
        exclude: ['ru/articles/*.md'],
        prefix: '/ru',
      },
      schema: commonContentSchema,
    }),
  ),
  articles_en: defineCollection(
    asSeoCollection({
      type: 'page',
      source: {
        include: 'en/articles/*.md',
        prefix: '/en/articles',
      },
      schema: commonArticleSchema,
    }),
  ),
  articles_ru: defineCollection(
    asSeoCollection({
      type: 'page',
      source: {
        include: 'ru/articles/*.md',
        prefix: '/ru/articles',
      },
      schema: commonArticleSchema,
    }),
  ),
  projects_en: defineCollection(
    asSeoCollection({
      type: 'data',
      source: 'en/projects/*.json',
      schema: commonProjectSchema,
    }),
  ),
  projects_ru: defineCollection(
    asSeoCollection({
      type: 'data',
      source: 'ru/projects/*.json',
      schema: commonProjectSchema,
    }),
  ),
  stack: defineCollection({
    type: 'data',
    source: 'stack.json',
    schema: z.object({
      items: z.array(
        z.object({
          name: z.string().nonempty(),
          link: z.string().url(),
          icon: z.string().nonempty(),
        }),
      ),
    }),
  }),
  faq_en: defineCollection({
    type: 'data',
    source: 'en/faq.json',
    schema: commonFaqSchema,
  }),
  faq_ru: defineCollection({
    type: 'data',
    source: 'ru/faq.json',
    schema: commonFaqSchema,
  }),
}

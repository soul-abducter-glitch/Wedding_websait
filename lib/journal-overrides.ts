import type { ContentBlock, JournalPost } from "@/types/content"

type Override = Partial<JournalPost> & { slug: string }

const overrides: Record<string, Record<string, Override>> = {
  ru: {
    "intimate-city-nights": {
      slug: "intimate-city-nights",
      title: "Интимные огни большого города",
      excerpt:
        "Вечерняя прогулка по центру сразу после церемонии: витрины горят золотом, а вы наконец-то выдыхаете и остаётесь вдвоём.",
      category: "Журнал",
      content: [
        {
          type: "paragraph",
          text:
            "Съёмка началась на закате: мягкий тёплый свет, отражения в витринах и редкие прохожие — всё, чтобы сохранить спокойствие после суматохи дня.",
        },
        {
          type: "paragraph",
          text:
            "Мы прошли привычные места пары: любимая кофейня за углом, мост с видом на огни города и узкая улочка, где они познакомились. Без постановки — только живые жесты и диалоги.",
        },
        {
          type: "paragraph",
          text:
            "Вместо длинного плейлиста — один трек в наушниках на двоих, чтобы поймать нужное настроение. Так появились кадры, где город растворяется, а остаются только двое.",
        },
      ],
    },
  },
}

export function applyJournalOverride(post: JournalPost, locale: string): JournalPost {
  const localeOverrides = overrides[locale]
  const override = localeOverrides?.[post.slug]
  if (!override) return post

  return {
    ...post,
    ...override,
    content: override.content ?? post.content,
  }
}

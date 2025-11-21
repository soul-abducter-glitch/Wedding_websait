import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { notFound } from "next/navigation"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const stories: Record<string, any> = {
  "anna-dmitry": {
    title: "Анна и Дмитрий",
    location: "Санкт-Петербург",
    date: "15 августа 2024",
    description:
      "Романтическая церемония в историческом особняке с видом на Неву. Анна и Дмитрий выбрали классический элегантный стиль для своей свадьбы, и каждая деталь была продумана до мелочей.",
    hero: "/romantic-wedding-ceremony.jpg",
    gallery: [
      "/romantic-wedding-ceremony.jpg",
      "/elegant-wedding-couple-walking.jpg",
      "/romantic-sunset-couple.jpg",
      "/emotional-ceremony-moment.jpg",
      "/couple-laughing-together.jpg",
      "/intimate-first-dance.jpg",
    ],
  },
  "maria-alexander": {
    title: "Мария и Александр",
    location: "Москва",
    date: "22 июля 2024",
    description:
      "Элегантная городская свадьба в центре Москвы. Мария и Александр хотели современную свадьбу с акцентом на архитектуру города и искренние эмоции.",
    hero: "/bride-and-groom-in-city.jpg",
    gallery: [
      "/bride-and-groom-in-city.jpg",
      "/elegant-wedding-couple-walking.jpg",
      "/couple-laughing-together.jpg",
      "/emotional-ceremony-moment.jpg",
    ],
  },
  "elena-sergey": {
    title: "Елена и Сергей",
    location: "Тоскана, Италия",
    date: "5 сентября 2024",
    description:
      "Destination wedding среди виноградников Тосканы. Елена и Сергей пригласили самых близких на церемонию в итальянской вилле с панорамным видом на холмы.",
    hero: "/destination-wedding-tuscany.jpg",
    gallery: [
      "/destination-wedding-tuscany.jpg",
      "/tuscany-vineyard-wedding.jpg",
      "/romantic-sunset-couple.jpg",
      "/couple-in-nature.jpg",
      "/intimate-first-dance.jpg",
    ],
  },
  "victoria-maxim": {
    title: "Виктория и Максим",
    location: "Подмосковье",
    date: "10 июня 2024",
    description:
      "Камерная свадьба на природе в окружении близких. Виктория и Максим выбрали уютный формат с акцентом на общение и атмосферу.",
    hero: "/couple-in-nature.jpg",
    gallery: [
      "/couple-in-nature.jpg",
      "/couple-laughing-together.jpg",
      "/romantic-sunset-couple.jpg",
      "/emotional-ceremony-moment.jpg",
    ],
  },
}

export function generateStaticParams() {
  return Object.keys(stories).map((slug) => ({ slug }))
}

export default function StoryPage({ params }: { params: { slug: string } }) {
  const story = stories[params.slug]

  if (!story) {
    notFound()
  }

  const otherStories = Object.entries(stories)
    .filter(([slug]) => slug !== params.slug)
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      {/* Hero */}
      <section className="relative h-[70vh] md:h-screen">
        <Image src={story.hero || "/placeholder.svg"} alt={story.title} fill className="object-cover" priority />
      </section>

      {/* Story Info */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">{story.title}</h1>
            <p className="text-text-muted mb-6">
              {story.location} · {story.date}
            </p>
            <p className="text-lg text-text-muted leading-relaxed">{story.description}</p>
          </div>
        </Container>
      </section>

      {/* Gallery - Masonry Style */}
      <section className="pb-24">
        <Container>
          <div className="space-y-8">
            {story.gallery.map((image: string, index: number) => {
              const isFullWidth = index % 3 === 0
              return (
                <div key={index} className={isFullWidth ? "" : "grid md:grid-cols-2 gap-8"}>
                  {isFullWidth ? (
                    <div className="relative aspect-[16/9]">
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`${story.title} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="relative aspect-[3/4]">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${story.title} ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {story.gallery[index + 1] && (
                        <div className="relative aspect-[3/4]">
                          <Image
                            src={story.gallery[index + 1] || "/placeholder.svg"}
                            alt={`${story.title} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* Other Stories */}
      {otherStories.length > 0 && (
        <section className="py-24 bg-bg-alt">
          <Container>
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">Другие истории</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {otherStories.map(([slug, otherStory]) => (
                <Link href={`/portfolio/${slug}`} key={slug} className="group">
                  <div className="relative aspect-[4/5] mb-4 overflow-hidden">
                    <Image
                      src={otherStory.hero || "/placeholder.svg"}
                      alt={otherStory.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-1">{otherStory.title}</h3>
                  <p className="text-sm text-text-muted">{otherStory.location}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Обсудим вашу свадьбу?</h2>
            <p className="text-text-muted mb-8">Напишите мне, чтобы узнать детали и забронировать дату</p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-4 text-sm tracking-wide hover:bg-text-muted transition-colors"
            >
              СВЯЗАТЬСЯ СО МНОЙ
            </Link>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

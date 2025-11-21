import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const stories = [
  {
    slug: "anna-dmitry",
    title: "Анна и Дмитрий",
    location: "Санкт-Петербург",
    date: "Август 2024",
    image: "/romantic-wedding-ceremony.jpg",
    excerpt: "Романтическая церемония в историческом особняке с видом на Неву",
  },
  {
    slug: "maria-alexander",
    title: "Мария и Александр",
    location: "Москва",
    date: "Июль 2024",
    image: "/bride-and-groom-in-city.jpg",
    excerpt: "Элегантная городская свадьба в центре Москвы",
  },
  {
    slug: "elena-sergey",
    title: "Елена и Сергей",
    location: "Тоскана, Италия",
    date: "Сентябрь 2024",
    image: "/destination-wedding-tuscany.jpg",
    excerpt: "Destination wedding среди виноградников Тосканы",
  },
  {
    slug: "victoria-maxim",
    title: "Виктория и Максим",
    location: "Подмосковье",
    date: "Июнь 2024",
    image: "/couple-in-nature.jpg",
    excerpt: "Камерная свадьба на природе в окружении близких",
  },
]

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Портфолио</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Истории любви</h1>
            <p className="text-lg text-text-muted text-pretty">
              Каждая свадьба уникальна. Здесь собраны истории пар, которые доверили мне запечатлеть самый важный день их
              жизни
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {stories.map((story) => (
              <Link href={`/portfolio/${story.slug}`} key={story.slug} className="group">
                <div className="relative aspect-[4/5] mb-6 overflow-hidden">
                  <Image
                    src={story.image || "/placeholder.svg"}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl mb-2">{story.title}</h2>
                  <p className="text-sm text-text-muted mb-3">
                    {story.location} · {story.date}
                  </p>
                  <p className="text-text-muted leading-relaxed">{story.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

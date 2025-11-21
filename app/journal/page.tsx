import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const posts = [
  {
    slug: "how-to-choose-wedding-photographer",
    title: "Как выбрать свадебного фотографа",
    excerpt: "Главные критерии выбора фотографа для вашей свадьбы и на что обратить внимание при знакомстве",
    image: "/photographer-portrait.png",
    date: "15 января 2025",
    category: "Советы",
  },
  {
    slug: "wedding-day-timeline",
    title: "Тайминг свадебного дня",
    excerpt: "Как спланировать день свадьбы, чтобы успеть всё и получить красивые фотографии",
    image: "/romantic-sunset-couple.jpg",
    date: "8 января 2025",
    category: "Планирование",
  },
  {
    slug: "best-light-for-photos",
    title: "Золотой час: лучшее время для фото",
    excerpt: "Почему свет так важен в фотографии и как использовать его для создания магических кадров",
    image: "/couple-in-nature.jpg",
    date: "22 декабря 2024",
    category: "Фотография",
  },
  {
    slug: "destination-wedding-guide",
    title: "Гид по destination wedding",
    excerpt: "Всё, что нужно знать о свадьбе за границей: от выбора локации до организации съёмки",
    image: "/destination-wedding-tuscany.jpg",
    date: "10 декабря 2024",
    category: "Советы",
  },
]

export default function JournalPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Журнал</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Статьи и советы</h1>
            <p className="text-lg text-text-muted text-pretty">
              Делюсь своим опытом, рассказываю о фотографии и даю советы по планированию свадьбы
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {posts.map((post) => (
              <Link href={`/journal/${post.slug}`} key={post.slug} className="group">
                <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <p className="text-xs tracking-widest uppercase text-text-muted mb-2">
                  {post.category} · {post.date}
                </p>
                <h2 className="font-display text-3xl mb-3 group-hover:text-text-muted transition-colors">
                  {post.title}
                </h2>
                <p className="text-text-muted leading-relaxed">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

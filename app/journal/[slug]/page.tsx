import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

// Mock data - replace with actual data fetching
const post = {
  title: "Как выбрать свадебного фотографа",
  date: "15 января 2025",
  category: "Советы",
  image: "/photographer-portrait.png",
  content: `
    <p>Выбор свадебного фотографа — одно из самых важных решений при планировании свадьбы. Фотографии останутся с вами навсегда, когда платье будет убрано в шкаф, цветы завянут, а торт съеден.</p>

    <h2>Определите свой стиль</h2>
    <p>Первый шаг — понять, какой стиль фотографии вам нравится. Существует несколько основных направлений:</p>
    <ul>
      <li><strong>Репортажная фотография</strong> — документирование событий без постановки</li>
      <li><strong>Fine art</strong> — художественная, эстетичная съёмка с вниманием к композиции</li>
      <li><strong>Классическая</strong> — традиционные постановочные портреты</li>
      <li><strong>Editorial</strong> — модный, журнальный подход</li>
    </ul>

    <h2>Изучите портфолио</h2>
    <p>Посмотрите не только на избранные работы, но и на полные свадебные истории. Это покажет, как фотограф работает в течение всего дня, а не только в лучших условиях.</p>

    <h2>Обратите внимание на свет</h2>
    <p>Хороший фотограф умеет работать со светом в любых условиях. Посмотрите, как выглядят фотографии, снятые в помещении, при искусственном освещении, в пасмурную погоду.</p>

    <h2>Личная совместимость</h2>
    <p>Вы проведёте с фотографом весь день свадьбы — это должен быть человек, с которым вам комфортно. Обязательно созвонитесь или встретьтесь до бронирования.</p>

    <h2>Изучите отзывы</h2>
    <p>Почитайте, что пишут пары, которые уже работали с фотографом. Обратите внимание не только на качество фотографий, но и на процесс работы, пунктуальность, коммуникацию.</p>

    <h2>Уточните детали</h2>
    <p>Задайте важные вопросы:</p>
    <ul>
      <li>Сколько часов съёмки включено?</li>
      <li>Сколько фотографий я получу?</li>
      <li>Как долго займёт обработка?</li>
      <li>Что включено в стоимость?</li>
      <li>Есть ли дополнительные расходы?</li>
    </ul>

    <h2>Доверяйте интуиции</h2>
    <p>В конце концов, выбор фотографа — это вопрос доверия. Если вы чувствуете, что это "ваш" человек, который понимает вашу эстетику и подход — скорее всего, так и есть.</p>
  `,
}

export default function JournalPostPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <article className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <p className="text-xs tracking-widest uppercase text-text-muted mb-4">
                {post.category} · {post.date}
              </p>
              <h1 className="font-display text-5xl md:text-6xl mb-8 text-balance">{post.title}</h1>
            </div>

            <div className="relative aspect-[16/9] mb-12">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>

            <div
              className="prose prose-lg max-w-none
                prose-headings:font-display prose-headings:text-text-main
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                prose-p:text-text-muted prose-p:leading-relaxed prose-p:mb-6
                prose-ul:text-text-muted prose-ul:leading-relaxed
                prose-li:mb-2
                prose-strong:text-text-main prose-strong:font-medium"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <div className="mt-16 pt-8 border-t border-border-subtle">
              <Link
                href="/journal"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors"
              >
                ← Вернуться к статьям
              </Link>
            </div>
          </div>
        </Container>
      </article>

      {/* Related posts */}
      <section className="py-16 bg-bg-alt">
        <Container>
          <h2 className="font-display text-3xl mb-8 text-center">Читайте также</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                slug: "wedding-day-timeline",
                title: "Тайминг свадебного дня",
                image: "/romantic-sunset-couple.jpg",
              },
              {
                slug: "best-light-for-photos",
                title: "Золотой час: лучшее время для фото",
                image: "/couple-in-nature.jpg",
              },
              {
                slug: "destination-wedding-guide",
                title: "Гид по destination wedding",
                image: "/destination-wedding-tuscany.jpg",
              },
            ].map((relatedPost) => (
              <Link href={`/journal/${relatedPost.slug}`} key={relatedPost.slug} className="group">
                <div className="relative aspect-[4/3] mb-4 overflow-hidden">
                  <Image
                    src={relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="font-display text-xl group-hover:text-text-muted transition-colors">
                  {relatedPost.title}
                </h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const reviews = [
  {
    couple: "Анна и Дмитрий",
    wedding: "anna-dmitry",
    text: "Анна — волшебница! Она смогла передать атмосферу нашего дня так, что каждый раз, просматривая фотографии, мы заново переживаем эти эмоции. Она была ненавязчива, но при этом не упустила ни одного важного момента.",
    location: "Санкт-Петербург",
  },
  {
    couple: "Мария и Александр",
    wedding: "maria-alexander",
    text: "Мы очень долго искали фотографа, который понимает нашу эстетику. С Анной мы нашли не просто профессионала, но и человека, который разделяет наши ценности. Фотографии получились именно такими, как мы мечтали.",
    location: "Москва",
  },
  {
    couple: "Елена и Сергей",
    wedding: "elena-sergey",
    text: "Destination wedding в Италии — это всегда вызов для фотографа. Анна справилась блестяще! Она уловила магию Тосканы и нашей любви. Мы бесконечно благодарны за эти кадры.",
    location: "Тоскана, Италия",
  },
  {
    couple: "Виктория и Максим",
    wedding: "victoria-maxim",
    text: "Анна создала невероятную атмосферу на съёмке. Мы совершенно забыли о камере и просто наслаждались днём. А фотографии... они просто потрясающие! Живые, искренние, наполненные светом и любовью.",
    location: "Подмосковье",
  },
  {
    couple: "Дарья и Илья",
    wedding: "darya-ilya",
    text: "Работать с Анной — одно удовольствие. Она профессионал во всём: от подготовки до финального результата. Фотографии получились художественными и в то же время очень личными.",
    location: "Казань",
  },
  {
    couple: "Ксения и Роман",
    wedding: "ksenia-roman",
    text: "Анна не просто фотографирует — она рассказывает историю. Наша история любви получилась невероятно красивой благодаря её таланту и чуткости.",
    location: "Сочи",
  },
]

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Отзывы</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Слова пар</h1>
            <p className="text-lg text-text-muted text-pretty">
              Для меня нет большей награды, чем слова благодарности от пар, чьи истории я имела честь запечатлеть
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-12">
            {reviews.map((review, i) => (
              <div key={i} className="border-l-2 border-accent pl-8 py-4">
                <p className="text-lg text-text-muted leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xl">{review.couple}</p>
                    <p className="text-sm text-text-muted">{review.location}</p>
                  </div>
                  <Link
                    href={`/portfolio/${review.wedding}`}
                    className="text-sm border border-border-subtle px-6 py-2 hover:bg-bg-alt transition-colors"
                  >
                    СМОТРЕТЬ ИСТОРИЮ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24 bg-bg-alt">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Хотите стать частью моего портфолио?</h2>
            <p className="text-text-muted mb-8">
              Расскажите о своей свадьбе, и давайте создадим что-то прекрасное вместе
            </p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-4 text-sm tracking-wide hover:bg-text-muted transition-colors"
            >
              ОБСУДИТЬ СЪЁМКУ
            </Link>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageFooter } from "@/components/ui/page-footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      {/* Simple Header */}
      <header className="border-b border-border-subtle bg-bg-base/95 backdrop-blur-sm sticky top-0 z-50">
        <Container>
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="font-display text-2xl text-text-main">
              Anna Petrova
            </Link>
            <nav className="hidden md:flex items-center gap-8 text-sm">
              <Link href="/portfolio" className="text-text-muted hover:text-text-main transition-colors">
                Портфолио
              </Link>
              <Link href="/services" className="text-text-muted hover:text-text-main transition-colors">
                Услуги
              </Link>
              <Link href="/experience" className="text-text-muted hover:text-text-main transition-colors">
                Подход
              </Link>
              <Link href="/about" className="text-text-muted hover:text-text-main transition-colors">
                Обо мне
              </Link>
              <Link href="/reviews" className="text-text-muted hover:text-text-main transition-colors">
                Отзывы
              </Link>
              <Link href="/journal" className="text-text-muted hover:text-text-main transition-colors">
                Журнал
              </Link>
              <Link href="/faq" className="text-text-muted hover:text-text-main transition-colors">
                FAQ
              </Link>
              <Link href="/contact" className="text-text-muted hover:text-text-main transition-colors">
                Контакты
              </Link>
            </nav>
          </div>
        </Container>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <Image src="/elegant-wedding-couple-walking.jpg" alt="Wedding couple" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-bg-dark/20" />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl mb-6 text-balance">
            Истории любви,
            <br />
            рассказанные светом
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-pretty">
            Естественная свадебная фотография, которая передаёт настоящие эмоции вашего дня
          </p>
          <Link
            href="#contact"
            className="inline-block bg-white text-text-main px-8 py-4 text-sm tracking-wide hover:bg-bg-alt transition-colors"
          >
            ОБСУДИТЬ СЪЁМКУ
          </Link>
        </div>
      </section>

      {/* For Whom Section */}
      <section className="py-24 md:py-32" id="about">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Кому подойдёт</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 text-balance">
              Если вы ищете искренние кадры
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div>
              <h3 className="font-display text-2xl mb-4">Вам со мной по пути, если:</h3>
              <ul className="space-y-3 text-text-muted leading-relaxed">
                <li>• Хотите живые эмоции, а не постановочные позы</li>
                <li>• Цените эстетику и внимание к деталям</li>
                <li>• Готовы довериться фотографу</li>
                <li>• Важна атмосфера, а не количество кадров</li>
              </ul>
            </div>
            <div>
              <h3 className="font-display text-2xl mb-4">Вам не подойдёт, если:</h3>
              <ul className="space-y-3 text-text-muted leading-relaxed">
                <li>• Нужны классические постановочные портреты</li>
                <li>• Важно отчитаться фотографиями перед всеми</li>
                <li>• Ищете самую низкую цену</li>
                <li>• Хотите 5000 почти одинаковых кадров</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Portfolio Preview */}
      <section className="py-24 bg-bg-alt" id="portfolio">
        <Container>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Портфолио</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">Истории пар</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                slug: "anna-dmitry",
                title: "Анна и Дмитрий",
                location: "Петербург",
                image: "/romantic-wedding-ceremony.jpg",
              },
              {
                slug: "maria-alexander",
                title: "Мария и Александр",
                location: "Москва",
                image: "/bride-and-groom-in-city.jpg",
              },
              {
                slug: "elena-sergey",
                title: "Елена и Сергей",
                location: "Тоскана",
                image: "/destination-wedding-tuscany.jpg",
              },
            ].map((story, i) => (
              <div key={i}>
                <Link href={`/portfolio/${story.slug}`} className="group cursor-pointer block">
                  <div className="relative aspect-[3/4] mb-4 overflow-hidden">
                    <Image
                      src={story.image || "/placeholder.svg"}
                      alt={story.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="font-display text-2xl mb-1">{story.title}</h3>
                  <p className="text-sm text-text-muted">{story.location}</p>
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/portfolio"
              className="inline-block border border-border-subtle px-8 py-4 text-sm tracking-wide hover:bg-bg-base transition-colors"
            >
              СМОТРЕТЬ ВСЕ ИСТОРИИ
            </Link>
          </div>
        </Container>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32" id="services">
        <Container>
          <div className="text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Услуги</p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-balance">Пакеты съёмки</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Малый день",
                hours: "6 часов",
                price: "от 150 000 ₽",
                features: ["300+ кадров", "Онлайн-галерея", "Цветокоррекция"],
              },
              {
                name: "Полный день",
                hours: "10 часов",
                price: "от 250 000 ₽",
                features: ["500+ кадров", "Онлайн-галерея", "Цветокоррекция", "Фотокнига"],
                popular: true,
              },
              {
                name: "Два дня",
                hours: "2 дня",
                price: "от 400 000 ₽",
                features: ["800+ кадров", "Онлайн-галерея", "Цветокоррекция", "Фотокнига", "Печать 20х30"],
              },
            ].map((pkg, i) => (
              <div key={i}>
                <div
                  className={`border ${pkg.popular ? "border-accent bg-bg-alt" : "border-border-subtle"} p-8 h-full`}
                >
                  {pkg.popular && <div className="text-xs tracking-widest uppercase text-accent mb-4">Популярный</div>}
                  <h3 className="font-display text-3xl mb-2">{pkg.name}</h3>
                  <p className="text-sm text-text-muted mb-6">{pkg.hours}</p>
                  <p className="font-display text-2xl mb-8">{pkg.price}</p>
                  <ul className="space-y-3 text-sm text-text-muted mb-8">
                    {pkg.features.map((feature, j) => (
                      <li key={j}>• {feature}</li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className={`block text-center py-3 text-sm tracking-wide transition-colors ${
                      pkg.popular
                        ? "bg-accent text-text-main hover:bg-accent/80"
                        : "border border-border-subtle hover:bg-bg-alt"
                    }`}
                  >
                    ВЫБРАТЬ
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="py-24 bg-bg-alt" id="contact">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Обсудим вашу свадьбу?</h2>
            <p className="text-text-muted mb-8 text-pretty">
              Напишите мне в Telegram или заполните форму — отвечу в течение суток
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://t.me/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-text-main text-white px-8 py-4 text-sm tracking-wide hover:bg-text-muted transition-colors"
              >
                НАПИСАТЬ В TELEGRAM
              </a>
              <a
                href="mailto:hello@example.com"
                className="inline-block border border-border-subtle px-8 py-4 text-sm tracking-wide hover:bg-bg-base transition-colors"
              >
                ОТПРАВИТЬ EMAIL
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <PageFooter />
    </div>
  )
}

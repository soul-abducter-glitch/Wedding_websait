import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { Eyebrow } from "@/components/ui/eyebrow"
import { LeadText } from "@/components/ui/lead-text"
import { CustomButton } from "@/components/ui/custom-button"
import { StoryCard } from "@/components/ui/story-card"
import { TestimonialCard } from "@/components/ui/testimonial-card"
import { Reveal } from "@/components/ui/reveal"
import Link from "next/link"
import { stories } from "@/data/stories"
import Image from "next/image"
import { Check } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"

export const metadata = {
  title: "Анна Петрова — Свадебный фотограф",
  description: "Живые эмоции вместо постановки. Естественные кадры, в которых вы узнаете себя настоящих.",
}

export default function HomePage() {
  const locale = "ru"
  const featuredStories = stories.filter((story) => story.featured && story.locale === locale).slice(0, 3)

  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-1 mt-[72px] md:mt-[88px]">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/elegant-wedding-couple-walking.jpg"
              alt="Wedding couple"
              fill
              priority
              className="object-cover"
              quality={90}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/60 via-bg-dark/20 to-transparent" />
          </div>

          <Container className="relative z-10 text-white">
            <div className="max-w-3xl">
              <Reveal>
                <Eyebrow className="text-white/90 mb-6">Свадебный фотограф Анна Петрова</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <Heading level={1} className="mb-6 text-balance text-white">
                  Свадебная съёмка, после которой вы не будете стесняться своих фотографий
                </Heading>
              </Reveal>
              <Reveal delay={0.2}>
                <LeadText className="mb-6 text-white/90 text-pretty">
                  Живые эмоции вместо постановки. Естественные кадры, в которых вы узнаете себя настоящих.
                </LeadText>
              </Reveal>
              <Reveal delay={0.3}>
                <p className="text-sm uppercase tracking-wider mb-8 text-white/80">
                  10+ лет • 100+ свадеб • Москва и выезды
                </p>
              </Reveal>
              <Reveal delay={0.4}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/ru/contact">
                    <CustomButton variant="primary" withArrow>
                      Проверить дату и стоимость
                    </CustomButton>
                  </Link>
                  <Link href="/ru/portfolio">
                    <CustomButton variant="secondary">Посмотреть портфолио</CustomButton>
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </section>

        {/* For Who Section */}
        <Section background="base">
          <Container>
            <Reveal>
              <Eyebrow className="text-center mb-12">Кому подойдёт моя съёмка</Eyebrow>
            </Reveal>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <Reveal delay={0.1}>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">Для вас, если...</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">Вы хотите быть собой, а не играть роль</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">Вам важны живые эмоции, а не идеальные позы</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">Вы цените естественность и искренность</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
                      <span className="leading-relaxed">Вам нужен фотограф, который не пропадёт</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl mb-6">Не подойдёт, если...</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex-shrink-0 mt-1 text-text-muted">—</span>
                      <span className="leading-relaxed text-text-muted">Вы хотите только постановочные кадры</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex-shrink-0 mt-1 text-text-muted">—</span>
                      <span className="leading-relaxed text-text-muted">
                        Вам нужна обработка в стиле глянцевого журнала
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex-shrink-0 mt-1 text-text-muted">—</span>
                      <span className="leading-relaxed text-text-muted">Вы не готовы довериться фотографу</span>
                    </li>
                  </ul>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* What You Get Section */}
        <Section background="alt">
          <Container>
            <Reveal>
              <Heading level={2} className="text-center mb-16">
                Что вы получите
              </Heading>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <Reveal delay={0}>
                <div className="text-center">
                  <h3 className="font-display text-xl mb-3">Целостная история дня</h3>
                  <p className="text-text-muted text-sm">От сборов до танцев — все важные моменты</p>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="text-center">
                  <h3 className="font-display text-xl mb-3">Живые эмоции</h3>
                  <p className="text-text-muted text-sm">Никакой деревянности, только искренние чувства</p>
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="text-center">
                  <h3 className="font-display text-xl mb-3">Готовая подборка</h3>
                  <p className="text-text-muted text-sm">Для печати альбома и публикации в соцсетях</p>
                </div>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="text-center">
                  <h3 className="font-display text-xl mb-3">Понятные сроки</h3>
                  <p className="text-text-muted text-sm">Вы всегда знаете, когда получите фотографии</p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Featured Stories Section */}
        <Section background="base">
          <Container>
            <Reveal>
              <Heading level={2} className="text-center mb-16">
                Истории свадеб
              </Heading>
            </Reveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
              {featuredStories.map((story, index) => (
                <Reveal key={story.id} delay={index * 0.1}>
                  <StoryCard
                    slug={story.slug}
                    coupleNames={story.coupleNames}
                    location={story.location}
                    country={story.country}
                    preview={story.preview}
                    shortDescription={story.shortDescription}
                    locale={locale}
                  />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>

        {/* Mini About Section */}
        <Section background="alt">
          <Container>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
              <Reveal>
                <div className="relative aspect-[3/4] rounded-sm overflow-hidden">
                  <Image src="/photographer-portrait.png" alt="Anna Petrova" fill className="object-cover" />
                </div>
              </Reveal>
              <Reveal delay={0.2}>
                <div>
                  <Eyebrow className="mb-6">Обо мне</Eyebrow>
                  <Heading level={2} className="mb-6">
                    Фотографирую свадьбы так, чтобы вы узнали себя настоящих
                  </Heading>
                  <div className="space-y-4 text-text-muted leading-relaxed mb-8">
                    <p>
                      Моя задача — сохранить настоящие эмоции вашего дня. Без деревянных поз, без бесконечных
                      перестановок, без стресса.
                    </p>
                    <p>
                      За 10+ лет я сняла более 100 свадеб в России и за границей. Работаю так, чтобы вы могли полностью
                      погрузиться в свой день.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div>
                      <p className="font-medium">10+ лет</p>
                      <p className="text-text-muted">Опыта</p>
                    </div>
                    <div>
                      <p className="font-medium">100+ свадеб</p>
                      <p className="text-text-muted">Снято</p>
                    </div>
                    <div>
                      <p className="font-medium">15+ городов</p>
                      <p className="text-text-muted">География</p>
                    </div>
                    <div>
                      <p className="font-medium">Любой формат</p>
                      <p className="text-text-muted">От 4 до 12 часов</p>
                    </div>
                  </div>
                  <Link href="/ru/about">
                    <CustomButton variant="secondary" withArrow>
                      Подробнее обо мне
                    </CustomButton>
                  </Link>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Testimonials Section */}
        <Section background="base">
          <Container>
            <Reveal>
              <Heading level={2} className="text-center mb-16">
                Отзывы пар
              </Heading>
            </Reveal>
            <div className="grid md:grid-cols-3 gap-8">
              <Reveal delay={0}>
                <TestimonialCard
                  quote="Анна смогла поймать все важные моменты нашего дня. Мы пересматриваем фотографии и каждый раз возвращаемся в тот день."
                  coupleNames="Мария и Алекс"
                  location="Москва"
                />
              </Reveal>
              <Reveal delay={0.1}>
                <TestimonialCard
                  quote="Мы боялись, что будем деревянными в кадре. Но Анна создала такую атмосферу, что мы забыли о камере и просто наслаждались днём."
                  coupleNames="Елена и Дмитрий"
                  location="Санкт-Петербург"
                />
              </Reveal>
              <Reveal delay={0.2}>
                <TestimonialCard
                  quote="Это именно те фотографии, о которых мы мечтали. Живые, настоящие, искренние. Спасибо за нашу историю!"
                  coupleNames="Анна и Сергей"
                  location="Тоскана, Италия"
                />
              </Reveal>
            </div>
          </Container>
        </Section>

        {/* Final CTA Section */}
        <Section background="alt">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <Reveal>
                <Heading level={2} className="mb-6">
                  Готовы доверить мне вашу свадьбу?
                </Heading>
              </Reveal>
              <Reveal delay={0.1}>
                <LeadText className="mb-8">Проверьте свободна ли ваша дата и узнайте стоимость</LeadText>
              </Reveal>
              <Reveal delay={0.2}>
                <Link href="/ru/contact">
                  <CustomButton variant="primary" withArrow className="mx-auto">
                    Проверить дату
                  </CustomButton>
                </Link>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer locale={locale} />
    </div>
  )
}

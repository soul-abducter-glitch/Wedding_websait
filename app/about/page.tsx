import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            <div className="relative aspect-[3/4]">
              <Image src="/photographer-portrait.png" alt="Anna Petrova" fill className="object-cover" />
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Обо мне</p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6">Привет, я Анна</h1>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Свадебный фотограф из Санкт-Петербурга с опытом более 8 лет. Специализируюсь на естественной
                  репортажной съёмке, которая передаёт настоящие эмоции и атмосферу вашего дня.
                </p>
                <p>
                  Я верю, что лучшие кадры рождаются не в постановке, а в моменте — когда вы забываете о камере и просто
                  наслаждаетесь днём. Моя задача — быть незаметной, но при этом не упустить ни одной важной детали.
                </p>
                <p>
                  Работаю как в России, так и за рубежом. Люблю destination weddings и путешествия за красивыми
                  историями.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">Несколько фактов обо мне</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <p className="font-display text-5xl mb-2">150+</p>
                <p className="text-text-muted">Снятых свадеб</p>
              </div>
              <div className="text-center">
                <p className="font-display text-5xl mb-2">12</p>
                <p className="text-text-muted">Стран, где я работала</p>
              </div>
              <div className="text-center">
                <p className="font-display text-5xl mb-2">8</p>
                <p className="text-text-muted">Лет опыта</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-bg-alt">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl text-center mb-12">Мой подход</h2>
            <div className="space-y-8">
              <div>
                <h3 className="font-display text-2xl mb-3">Естественность превыше всего</h3>
                <p className="text-text-muted leading-relaxed">
                  Никаких натянутых улыбок и неестественных поз. Я снимаю вас такими, какие вы есть — искренними,
                  влюблёнными, счастливыми.
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-3">Внимание к деталям</h3>
                <p className="text-text-muted leading-relaxed">
                  От утренних сборов до последнего танца — я фиксирую всё, что делает ваш день особенным. Букет, кольца,
                  декор, взгляды — всё имеет значение.
                </p>
              </div>
              <div>
                <h3 className="font-display text-2xl mb-3">Атмосфера, а не количество</h3>
                <p className="text-text-muted leading-relaxed">
                  Я не гонюсь за количеством кадров. Важнее передать настроение дня — от волнения утра до эйфории
                  вечера.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Давайте познакомимся</h2>
            <p className="text-text-muted mb-8">
              Напишите мне, и мы обсудим вашу свадьбу за чашкой кофе (или в видеозвонке)
            </p>
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

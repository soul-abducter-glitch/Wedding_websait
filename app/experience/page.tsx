import Image from "next/image"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function ExperiencePage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      {/* Hero */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Мой подход</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Как я работаю</h1>
            <p className="text-lg text-text-muted text-pretty leading-relaxed">
              Свадебная фотография для меня — это не про постановку и контроль. Это про доверие, наблюдение и умение
              быть невидимым в нужный момент.
            </p>
          </div>
        </Container>
      </section>

      {/* Philosophy */}
      <section className="py-16 bg-bg-alt">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4]">
              <Image src="/couple-laughing-together.jpg" alt="Couple laughing" fill className="object-cover" />
            </div>
            <div>
              <h2 className="font-display text-4xl mb-6">Философия съёмки</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  Я верю, что лучшие кадры случаются тогда, когда пара забывает о камере и просто проживает свой день.
                </p>
                <p>
                  Моя задача — создать атмосферу доверия и комфорта, чтобы вы могли быть собой. Я не прошу вас
                  «улыбнуться в камеру» или принять неестественную позу.
                </p>
                <p>Вместо этого я наблюдаю, ловлю взгляды, улыбки, объятия — всё то, что делает ваш день уникальным.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="py-24">
        <Container>
          <div className="max-w-2xl mx-auto mb-16 text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Процесс работы</h2>
            <p className="text-text-muted">От первого знакомства до получения готовых фотографий</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-16">
            {[
              {
                number: "01",
                title: "Знакомство",
                description:
                  "Начнём с созвона или встречи, где я узнаю о ваших планах, пожеланиях и ожиданиях. Это важно, чтобы мы поняли, подходим ли друг другу.",
              },
              {
                number: "02",
                title: "Подготовка",
                description:
                  "Я изучу локации, составлю тайминг съёмки и буду на связи, чтобы ответить на любые вопросы перед свадьбой.",
              },
              {
                number: "03",
                title: "День свадьбы",
                description:
                  "В день свадьбы я ненавязчиво документирую всё происходящее — от сборов до первого танца. Вы живёте свой день, я фиксирую моменты.",
              },
              {
                number: "04",
                title: "Отбор и обработка",
                description:
                  "После свадьбы я отбираю лучшие кадры и обрабатываю их в своей авторской стилистике. Это занимает 4-6 недель.",
              },
              {
                number: "05",
                title: "Передача фотографий",
                description:
                  "Готовые фотографии вы получаете в онлайн-галерее, откуда можете скачать их в высоком разрешении и поделиться с близкими.",
              },
            ].map((step, i) => (
              <div key={i} className="grid md:grid-cols-[120px_1fr] gap-8">
                <div className="font-display text-6xl text-accent">{step.number}</div>
                <div>
                  <h3 className="font-display text-2xl mb-3">{step.title}</h3>
                  <p className="text-text-muted leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="py-24 bg-bg-alt">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl mb-12 text-center">Что для меня важно</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Доверие",
                  description: "Вы доверяете мне свой день, я ценю это и делаю всё, чтобы оправдать доверие.",
                },
                {
                  title: "Искренность",
                  description: "Никакой фальши — только настоящие эмоции и моменты.",
                },
                {
                  title: "Эстетика",
                  description: "Внимание к свету, композиции и деталям в каждом кадре.",
                },
                {
                  title: "Комфорт",
                  description: "Вы должны чувствовать себя свободно, а не как модели на съёмке.",
                },
              ].map((value, i) => (
                <div key={i} className="p-6 border border-border-subtle">
                  <h3 className="font-display text-xl mb-2">{value.title}</h3>
                  <p className="text-sm text-text-muted leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6">Готовы обсудить съёмку?</h2>
            <p className="text-text-muted mb-8">Напишите мне, расскажите о своей свадьбе — и давайте познакомимся</p>
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

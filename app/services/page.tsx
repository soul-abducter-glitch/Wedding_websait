import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const packages = [
  {
    name: "Малый день",
    hours: "6 часов",
    price: "от 150 000 ₽",
    description: "Идеально для камерной свадьбы или регистрации с небольшим количеством гостей",
    features: [
      "300+ обработанных кадров",
      "Онлайн-галерея для скачивания",
      "Профессиональная цветокоррекция",
      "Готовность через 4-6 недель",
    ],
  },
  {
    name: "Полный день",
    hours: "10 часов",
    price: "от 250 000 ₽",
    description: "Самый популярный пакет — полное сопровождение от сборов до первого танца",
    features: [
      "500+ обработанных кадров",
      "Онлайн-галерея для скачивания",
      "Профессиональная цветокоррекция",
      "Премиум фотокнига 30x30 см",
      "Готовность через 4-6 недель",
    ],
    popular: true,
  },
  {
    name: "Два дня",
    hours: "2 дня",
    price: "от 400 000 ₽",
    description: "Для свадеб, которые длятся несколько дней — полное погружение в вашу историю",
    features: [
      "800+ обработанных кадров",
      "Онлайн-галерея для скачивания",
      "Профессиональная цветокоррекция",
      "Премиум фотокнига 30x30 см",
      "20 отпечатков 20x30 см",
      "Готовность через 6-8 недель",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Услуги</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Пакеты съёмки</h1>
            <p className="text-lg text-text-muted text-pretty">
              Выберите пакет, который подходит под формат вашей свадьбы. Все цены можно обсудить индивидуально
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`border p-8 md:p-10 ${pkg.popular ? "border-accent bg-bg-alt" : "border-border-subtle"}`}
              >
                {pkg.popular && <div className="text-xs tracking-widest uppercase text-accent mb-4">Популярный</div>}
                <h2 className="font-display text-3xl md:text-4xl mb-2">{pkg.name}</h2>
                <p className="text-sm text-text-muted mb-6">{pkg.hours}</p>
                <p className="font-display text-2xl md:text-3xl mb-6">{pkg.price}</p>
                <p className="text-text-muted mb-8 leading-relaxed">{pkg.description}</p>
                <ul className="space-y-3 text-sm text-text-muted mb-10">
                  {pkg.features.map((feature, i) => (
                    <li key={i}>• {feature}</li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`block text-center py-3 text-sm tracking-wide transition-colors ${
                    pkg.popular
                      ? "bg-accent text-text-main hover:bg-accent/80"
                      : "border border-border-subtle hover:bg-bg-alt"
                  }`}
                >
                  ВЫБРАТЬ
                </Link>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="font-display text-3xl md:text-4xl mb-6">Что входит во все пакеты</h2>
              <div className="grid md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="font-display text-xl mb-3">Предсвадебная встреча</h3>
                  <p className="text-text-muted leading-relaxed">
                    Обсудим все детали, познакомимся, составим тайминг дня
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">Естественная обработка</h3>
                  <p className="text-text-muted leading-relaxed">
                    Цветокоррекция в авторском стиле, без пересветов и перенасыщения
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">Удобная галерея</h3>
                  <p className="text-text-muted leading-relaxed">
                    Все фотографии в защищённой онлайн-галерее для скачивания
                  </p>
                </div>
                <div>
                  <h3 className="font-display text-xl mb-3">Без ограничений</h3>
                  <p className="text-text-muted leading-relaxed">
                    Полные права на использование фотографий в личных целях
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 bg-bg-alt">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-5xl mb-6 text-balance">Не можете определиться?</h2>
            <p className="text-text-muted mb-8">
              Напишите мне, и я помогу выбрать подходящий пакет под ваш формат свадьбы
            </p>
            <Link
              href="/contact"
              className="inline-block bg-text-main text-white px-8 py-4 text-sm tracking-wide hover:bg-text-muted transition-colors"
            >
              НАПИСАТЬ МНЕ
            </Link>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

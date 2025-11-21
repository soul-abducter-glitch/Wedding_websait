"use client"

import { useState } from "react"
import Link from "next/link"
import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

const faqs = [
  {
    question: "Как забронировать дату?",
    answer:
      "Напишите мне в Telegram или заполните форму на сайте. После обсуждения деталей я высылаю договор и счёт на предоплату. Дата считается забронированной после внесения предоплаты 30%.",
  },
  {
    question: "Сколько времени занимает обработка?",
    answer:
      "Обработка фотографий занимает 4-6 недель после свадьбы. В высокий сезон (май-сентябрь) срок может увеличиться до 8 недель. Несколько sneak peek кадров вы получите в течение 3-5 дней.",
  },
  {
    question: "Сколько фотографий я получу?",
    answer:
      "Количество кадров зависит от выбранного пакета: 300+ для малого дня, 500+ для полного дня, 800+ для двухдневной съёмки. Все фотографии проходят тщательный отбор и цветокоррекцию.",
  },
  {
    question: "Можно ли увеличить количество часов съёмки?",
    answer:
      "Да, конечно! Каждый дополнительный час съёмки стоит 15 000 ₽. Также можно добавить второго фотографа или видеографа — обсудим детали индивидуально.",
  },
  {
    question: "Вы работаете в других городах?",
    answer:
      "Да, я с удовольствием снимаю destination weddings по всей России и за рубежом. Расходы на перелёт и проживание оплачиваются отдельно. Для зарубежных свадеб действуют специальные условия.",
  },
  {
    question: "Что если погода испортится?",
    answer:
      "У меня всегда есть план B! Плохая погода — не повод отменять съёмку. Дождь и облака могут создать невероятную атмосферу. Я помогу скорректировать локации и тайминг.",
  },
  {
    question: "Нужна ли предсвадебная встреча?",
    answer:
      "Я рекомендую провести предсвадебную встречу или love story съёмку. Это помогает нам познакомиться, вам — привыкнуть к камере, а мне — понять вашу динамику как пары.",
  },
  {
    question: "В каком формате я получу фотографии?",
    answer:
      "Все фотографии вы получаете в онлайн-галерее в высоком разрешении (подходит для печати до формата A3). Также предоставляю уменьшенные версии для соцсетей. Исходные RAW-файлы не передаются.",
  },
  {
    question: "Можно ли внести правки в обработку?",
    answer:
      "Я обрабатываю фотографии в своём авторском стиле — именно за него меня выбирают пары. Если есть пожелания по кадрированию или яркости отдельных фото, обсудим индивидуально.",
  },
  {
    question: "Что входит в предоплату?",
    answer:
      "Предоплата 30% бронирует дату и идёт в счёт финальной стоимости. Оставшиеся 70% оплачиваются за 2 недели до свадьбы. Возврат предоплаты возможен только при отмене свадьбы не позднее чем за 3 месяца.",
  },
]

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-b border-border-subtle">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left hover:opacity-70 transition-opacity"
      >
        <h3 className="font-display text-xl md:text-2xl pr-8">{question}</h3>
        <span className="text-2xl text-accent flex-shrink-0">{isOpen ? "−" : "+"}</span>
      </button>
      {isOpen && <div className="pb-6 text-text-muted leading-relaxed pr-12">{answer}</div>}
    </div>
  )
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-widest uppercase text-text-muted mb-4">FAQ</p>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Частые вопросы</h1>
            <p className="text-lg text-text-muted text-pretty">
              Ответы на самые популярные вопросы о съёмке и сотрудничестве
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <FaqItem key={i} question={faq.question} answer={faq.answer} />
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-16 p-8 bg-bg-alt text-center">
            <h2 className="font-display text-2xl mb-4">Не нашли ответ?</h2>
            <p className="text-text-muted mb-6">Напишите мне напрямую — я с радостью отвечу на любые вопросы</p>
            <Link
              href="/contact"
              className="inline-block border border-border-subtle px-8 py-3 text-sm tracking-wide hover:bg-bg-base transition-colors"
            >
              ЗАДАТЬ ВОПРОС
            </Link>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

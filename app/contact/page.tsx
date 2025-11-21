import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24 md:py-32">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-xs tracking-widest uppercase text-text-muted mb-4">Контакты</p>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl mb-6 text-balance">Обсудим вашу свадьбу?</h1>
              <p className="text-lg text-text-muted text-pretty">
                Напишите мне удобным способом, и я отвечу в течение суток
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <a
                href="https://t.me/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle p-8 hover:bg-bg-alt transition-colors group"
              >
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">Telegram</h2>
                <p className="text-text-muted mb-4">Самый быстрый способ связаться</p>
                <p className="text-sm">@yourhandle</p>
              </a>

              <a
                href="mailto:hello@annapetrova.photo"
                className="border border-border-subtle p-8 hover:bg-bg-alt transition-colors group"
              >
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">Email</h2>
                <p className="text-text-muted mb-4">Для официальных запросов</p>
                <p className="text-sm">hello@annapetrova.photo</p>
              </a>

              <a
                href="https://instagram.com/yourhandle"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle p-8 hover:bg-bg-alt transition-colors group"
              >
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">Instagram</h2>
                <p className="text-text-muted mb-4">Актуальные работы и истории</p>
                <p className="text-sm">@yourhandle</p>
              </a>

              <a
                href="https://wa.me/yourphone"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-border-subtle p-8 hover:bg-bg-alt transition-colors group"
              >
                <h2 className="font-display text-2xl mb-3 group-hover:text-accent transition-colors">WhatsApp</h2>
                <p className="text-text-muted mb-4">Звонки и сообщения</p>
                <p className="text-sm">+7 (XXX) XXX-XX-XX</p>
              </a>
            </div>

            <div className="bg-bg-alt p-8 md:p-12">
              <h2 className="font-display text-3xl mb-6">Что нужно для бронирования?</h2>
              <div className="space-y-4 text-text-muted leading-relaxed">
                <p>
                  <strong className="text-text-main">1. Напишите мне</strong> — расскажите о вашей свадьбе: дата, место,
                  формат, примерное количество гостей
                </p>
                <p>
                  <strong className="text-text-main">2. Созвонимся</strong> — обсудим все детали, я отвечу на вопросы и
                  покажу примеры работ
                </p>
                <p>
                  <strong className="text-text-main">3. Договор и предоплата</strong> — после согласования всех условий
                  подписываем договор и вносим предоплату 30%
                </p>
                <p>
                  <strong className="text-text-main">4. Дата забронирована!</strong> — дальше остаётся только ждать
                  вашего прекрасного дня
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

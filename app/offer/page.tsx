import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl mb-8">Договор оферты</h1>

            <div className="space-y-8 text-text-muted leading-relaxed">
              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">1. Общие положения</h2>
                <p>
                  Настоящий документ является официальным предложением (публичной офертой) ИП Петровой Анны Сергеевны
                  (далее — Исполнитель) для физических лиц (далее — Заказчик) на оказание услуг свадебной фотосъёмки.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">2. Предмет договора</h2>
                <p>
                  Исполнитель обязуется оказать услуги по фотосъёмке мероприятия Заказчика (свадьбы), а Заказчик
                  обязуется оплатить эти услуги в порядке и на условиях, определённых настоящим Договором.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">3. Стоимость услуг</h2>
                <p className="mb-3">Стоимость услуг определяется согласно выбранному пакету:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Малый день (6 часов) — от 150 000 ₽</li>
                  <li>Полный день (10 часов) — от 250 000 ₽</li>
                  <li>Два дня — от 400 000 ₽</li>
                </ul>
                <p className="mt-3">Дополнительные услуги оплачиваются отдельно согласно прайс-листу.</p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">4. Порядок оплаты</h2>
                <p className="mb-3">
                  4.1. Для бронирования даты Заказчик вносит предоплату в размере 30% от стоимости услуг.
                </p>
                <p className="mb-3">4.2. Оставшиеся 70% оплачиваются не позднее чем за 14 дней до даты мероприятия.</p>
                <p>4.3. Оплата производится безналичным переводом на расчётный счёт Исполнителя.</p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">5. Обязанности Исполнителя</h2>
                <p className="mb-3">Исполнитель обязуется:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Прибыть на мероприятие в согласованное время</li>
                  <li>Провести фотосъёмку согласно выбранному пакету</li>
                  <li>Произвести отбор и обработку фотографий</li>
                  <li>Передать готовые фотографии в онлайн-галерее в течение 4-6 недель</li>
                  <li>Предоставить не менее 300/500/800 обработанных фотографий (в зависимости от пакета)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">6. Обязанности Заказчика</h2>
                <p className="mb-3">Заказчик обязуется:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Своевременно оплатить услуги Исполнителя</li>
                  <li>Предоставить информацию о тайминге и локациях мероприятия</li>
                  <li>Обеспечить доступ Исполнителя ко всем локациям съёмки</li>
                  <li>Информировать гостей о присутствии фотографа</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">7. Авторские права</h2>
                <p>
                  Исключительные права на фотографии принадлежат Исполнителю. Заказчик получает право использовать
                  фотографии в личных некоммерческих целях. Исполнитель вправе использовать фотографии в портфолио,
                  публикациях и рекламных материалах.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">8. Отмена и перенос</h2>
                <p className="mb-3">
                  8.1. При отмене мероприятия не позднее чем за 3 месяца до даты, предоплата возвращается в полном
                  объёме.
                </p>
                <p className="mb-3">8.2. При отмене менее чем за 3 месяца до даты, предоплата не возвращается.</p>
                <p>8.3. Перенос даты возможен при наличии свободной даты у Исполнителя без дополнительных расходов.</p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">9. Форс-мажор</h2>
                <p>
                  В случае форс-мажорных обстоятельств (болезнь, стихийные бедствия, чрезвычайные ситуации) стороны
                  освобождаются от ответственности. Исполнитель обязуется предложить замену или вернуть предоплату.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">10. Реквизиты</h2>
                <div className="space-y-1">
                  <p>ИП Петрова Анна Сергеевна</p>
                  <p>ИНН: 123456789012</p>
                  <p>ОГРНИП: 123456789012345</p>
                  <p>Адрес: г. Москва, ул. Примерная, д. 1</p>
                  <p>Email: hello@annapetrova.com</p>
                  <p>Телефон: +7 900 123 45 67</p>
                </div>
              </div>

              <div className="pt-8 border-t border-border-subtle">
                <p className="text-sm">Дата публикации: 15 января 2025</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

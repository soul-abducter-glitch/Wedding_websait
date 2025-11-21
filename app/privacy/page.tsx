import { Container } from "@/components/ui/container"
import { PageHeader } from "@/components/ui/page-header"
import { PageFooter } from "@/components/ui/page-footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-bg-base">
      <PageHeader />

      <section className="py-24">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="font-display text-5xl mb-8">Политика конфиденциальности</h1>

            <div className="space-y-8 text-text-muted leading-relaxed">
              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">1. Общие положения</h2>
                <p>
                  Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных
                  пользователей сайта annapetrova.com (далее — Сайт).
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">2. Собираемая информация</h2>
                <p className="mb-3">При использовании Сайта мы можем собирать следующую информацию:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Имя и фамилия</li>
                  <li>Адрес электронной почты</li>
                  <li>Номер телефона</li>
                  <li>Информация о свадьбе (дата, локация)</li>
                  <li>Техническая информация (IP-адрес, тип браузера, cookies)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">3. Цели обработки данных</h2>
                <p className="mb-3">Мы используем ваши персональные данные для:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Обработки заявок на съёмку</li>
                  <li>Коммуникации с клиентами</li>
                  <li>Оформления договоров</li>
                  <li>Улучшения качества услуг</li>
                  <li>Рассылки информационных материалов (с вашего согласия)</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">4. Защита данных</h2>
                <p>
                  Мы принимаем необходимые организационные и технические меры для защиты ваших персональных данных от
                  несанкционированного доступа, изменения, раскрытия или уничтожения.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">5. Передача данных третьим лицам</h2>
                <p>
                  Мы не передаём ваши персональные данные третьим лицам, за исключением случаев, предусмотренных
                  законодательством или с вашего явного согласия.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">6. Ваши права</h2>
                <p className="mb-3">Вы имеете право:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Получать информацию о ваших персональных данных</li>
                  <li>Требовать исправления неточных данных</li>
                  <li>Требовать удаления ваших данных</li>
                  <li>Отозвать согласие на обработку данных</li>
                  <li>Подать жалобу в надзорный орган</li>
                </ul>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">7. Cookies</h2>
                <p>
                  Сайт использует cookies для улучшения пользовательского опыта. Вы можете настроить ваш браузер на
                  отклонение cookies, но это может ограничить функциональность Сайта.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">8. Изменения политики</h2>
                <p>
                  Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная
                  версия всегда доступна на данной странице.
                </p>
              </div>

              <div>
                <h2 className="font-display text-2xl text-text-main mb-4">9. Контакты</h2>
                <p>
                  По вопросам обработки персональных данных вы можете связаться с нами по электронной почте:
                  hello@annapetrova.com
                </p>
              </div>

              <div className="pt-8 border-t border-border-subtle">
                <p className="text-sm">Дата последнего обновления: 15 января 2025</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <PageFooter />
    </div>
  )
}

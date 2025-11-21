import Link from "next/link"
import { Container } from "./container"

export function PageFooter() {
  return (
    <footer className="py-16 border-t border-border-subtle bg-bg-base">
      <Container>
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl mb-4">Anna Petrova</h3>
            <p className="text-sm text-text-muted leading-relaxed">
              Свадебный фотограф. Рассказываю истории любви через естественную фотографию.
            </p>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">Навигация</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <Link href="/portfolio" className="hover:text-text-main transition-colors">
                  Портфолио
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-text-main transition-colors">
                  Услуги
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-text-main transition-colors">
                  Обо мне
                </Link>
              </li>
              <li>
                <Link href="/reviews" className="hover:text-text-main transition-colors">
                  Отзывы
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-text-main transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">Контакты</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a href="tel:+79001234567" className="hover:text-text-main transition-colors">
                  +7 900 123 45 67
                </a>
              </li>
              <li>
                <a href="mailto:hello@annapetrova.com" className="hover:text-text-main transition-colors">
                  hello@annapetrova.com
                </a>
              </li>
              <li>
                <a
                  href="https://t.me/annapetrova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  Telegram
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm tracking-widest uppercase mb-4">Социальные сети</h4>
            <ul className="space-y-2 text-sm text-text-muted">
              <li>
                <a
                  href="https://instagram.com/annapetrova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://pinterest.com/annapetrova"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-text-main transition-colors"
                >
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-text-muted">
          <p>© 2025 Anna Petrova Photography. Все права защищены</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-text-main transition-colors">
              Политика конфиденциальности
            </Link>
            <Link href="/offer" className="hover:text-text-main transition-colors">
              Договор оферты
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  )
}

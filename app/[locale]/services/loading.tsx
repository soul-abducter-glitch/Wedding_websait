import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ServicesLoading() {
  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Eyebrow className="mb-4">Services</Eyebrow>
          <Heading level={1} className="mb-4">
            Загружаем пакеты...
          </Heading>
          <p className="text-lg text-text-muted leading-relaxed">Подтягиваем услуги с сервера</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-3 rounded-sm border border-border-subtle bg-white p-6">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

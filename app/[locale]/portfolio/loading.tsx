import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioLoading() {
  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <Eyebrow className="mb-4">Portfolio</Eyebrow>
          <Heading level={1} className="text-balance mb-4">
            Загрузка историй...
          </Heading>
          <p className="text-lg text-text-muted text-pretty leading-relaxed">Подготовка карточек портфолио</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="w-full aspect-[4/5]" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

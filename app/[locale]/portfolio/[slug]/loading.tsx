import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Heading } from "@/components/ui/heading"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortfolioSlugLoading() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[70vh] bg-bg-alt">
        <Skeleton className="absolute inset-0" />
      </section>
      <Section background="base">
        <Container>
          <div className="max-w-2xl mx-auto text-center space-y-4 mb-16">
            <Heading level={2}>Загрузка истории...</Heading>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[...Array(6)].map((_, idx) => (
              <Skeleton key={idx} className="aspect-[4/5]" />
            ))}
          </div>
        </Container>
      </Section>
    </div>
  )
}

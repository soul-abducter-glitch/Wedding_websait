import { Container } from "@/components/ui/container"
import { Section } from "@/components/ui/section"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReviewsLoading() {
  return (
    <Section background="base" className="pt-12 md:pt-20">
      <Container>
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
          <Eyebrow className="mb-2">Reviews</Eyebrow>
          <Heading level={1}>Загружаем отзывы...</Heading>
          <p className="text-text-muted">Подготовка отзывов</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4 rounded-sm bg-white p-6 shadow-sm">
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-16 w-full" />
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}

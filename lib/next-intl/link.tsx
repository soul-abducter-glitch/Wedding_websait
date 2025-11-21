"use client"

import { createNavigation } from "next-intl/navigation"
import type { ComponentProps } from "react"

type CreateNavigation = ReturnType<typeof createNavigation>
type NavigationLink = CreateNavigation["Link"]
type NavigationLinkProps = ComponentProps<NavigationLink>

export default function IntlLink(props: NavigationLinkProps) {
  const { Link } = createNavigation()
  return <Link {...props} />
}

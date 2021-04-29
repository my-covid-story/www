import { ReactElement } from 'react'

interface BlankLayoutProps {
  children: ReactElement
}

export default function BlankLayout({ children }: BlankLayoutProps) {
  return <main>{children}</main>
}

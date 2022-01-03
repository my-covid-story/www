import { ReactElement } from 'react'
import { Grid } from '@chakra-ui/react'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'

interface SiteLayoutProps {
  children: ReactElement
  stickyNav?: boolean
}

export default function SiteLayout({
  children,
  stickyNav = false,
}: SiteLayoutProps) {
  return (
    <Grid templateRows="auto 1fr auto" templateColumns="auto" minH="100vh">
      <Nav sticky={stickyNav} />
      <Grid as="main" templateRows="1fr auto" templateColumns="auto">
        {children}
      </Grid>
      <Footer />
    </Grid>
  )
}

import { ReactElement } from 'react'
import { Grid } from '@chakra-ui/react'
import { Token } from '@chakra-ui/styled-system/dist/types/utils'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'

import * as CSS from 'csstype'

interface SiteLayoutProps {
  children: ReactElement
  navPosition?: Token<CSS.Property.Position>
}

export default function SiteLayout({ children, navPosition = 'relative' }: SiteLayoutProps) {
  return (
    <Grid templateRows="auto 1fr auto" templateColumns="auto" minH="100vh">
      <Nav pos={navPosition} />
      <Grid as="main" templateRows="1fr auto" templateColumns="auto">
        {children}
      </Grid>
      <Footer />
    </Grid>
  )
}

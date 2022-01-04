import { ReactElement } from 'react'
import { Grid } from '@chakra-ui/react'

import Nav from '../components/common/Nav'
import Footer from '../components/common/Footer'
import AdminNav from '../components/admin/AdminNav'

interface SiteLayoutProps {
  children: ReactElement
}

export default function AdminLayout({ children }: SiteLayoutProps) {
  return (
    <Grid templateRows="auto 1fr auto" templateColumns="auto" minH="100vh">
      <Nav />
      <Grid
        as="main"
        templateRows="auto 1fr"
        templateColumns="auto"
        alignSelf="start"
      >
        <AdminNav />
        {children}
      </Grid>
      <Footer />
    </Grid>
  )
}

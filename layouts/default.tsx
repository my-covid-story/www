import React from 'react'
import Footer from '../components/footer'

const DefaultLayout = ({ children }) => [
  <div key={'content'} className={'layout'}>
    {children}
    <div className={'floatingCTA'} />
  </div>,
  <Footer key={'footer'} />,
]

export default DefaultLayout

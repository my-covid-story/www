import Footer from '../components/footer'
import FloatingCTA from '../components/floatingCTA'

const DefaultLayout = ({ children }) => (
  <>
    <main key={'content'} className={'layout'}>
      {children}
      <FloatingCTA />
    </main>
    <Footer key={'footer'} />
  </>
)

export default DefaultLayout

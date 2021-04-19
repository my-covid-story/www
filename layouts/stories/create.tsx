import Link from 'next/link'

const CreateLayout = ({ children }) => (
  <div className={'createLayout'}>
    {children}
    <footer>
      <Link href="/">
        <a>Back</a>
      </Link>
    </footer>
  </div>
)

export default CreateLayout

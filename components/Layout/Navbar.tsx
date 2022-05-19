import Link from 'next/link'
import Container from './Container'

const Navbar = () => {
  return (
    <div className="bg-white dark:bg-gray-850 sticky top-0 z-40 lg:border-b border-solid border-gray-150 dark:border-gray-800">
      <div className="hidden lg:contents">
        <Container className='relative flex flex-col gap-24 h-12'>
          <div className="flex justify-between items-center">
            <Link href="/" passHref>
              <a className="text-gray-600 no-underline flex justify-center items-center">
                Mintbase Engineering
              </a>
            </Link>
          </div>
        </Container>
      </div>
    </div>
  )
}

export default Navbar

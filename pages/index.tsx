import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'
import Link from 'next/link'

const links = [
  {
    href: 'https://testnet.mintbase.io/developer',
    title: 'Get an API Key',
    description:
      'The key to authenticate your app. This is used for file uploads and fetching useful information.',
  },
  {
    href: 'https://docs.mintbase.io/dev/getting-started',
    title: 'Documentation',
    description: 'Find in-depth information about Mintbase features and API',
  },
  {
    href: '',
    title: 'Examples',
    description: 'Discover and deploy boilerplate example Mintbase projects.',
  },
  {
    href: 'https://testnet.mintbase.io/create',
    title: 'Deploy a contract',
    description: 'The first step for an on-chain adventure.',
  },
]

const Home = () => {
  return (
    <>
      <Head>
        <title>Mintbase Engineering</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />

      <Container className="flex justify-center mt-24">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8">
          {links.map((link, index) => (
            <Link href={link.href} key={'link' + index} passHref>
              <a>
                <div className="w-80 h-48">
                  <Card title={link.title} description={link.description} />
                </div>
              </a>
            </Link>
          ))}
        </div>
      </Container>
    </>
  )
}

export default Home

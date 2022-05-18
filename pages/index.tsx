import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import Card from '../components/Card'

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
          <div className="w-80 h-48">
            <Card
              title={'Get an API Key'}
              description={
                'The key to authenticate your app. This is used for file uploads and fetching useful information.'
              }
            />
          </div>
          <div className="w-80 h-48">
            <Card
              title={'Documentation'}
              description={
                'Find in-depth information about Mintbase features and API'
              }
            />
          </div>
          <div className="w-80 h-48">
            <Card
              title={'Examples'}
              description={
                'Discover and deploy boilerplate example Mintbase projects.'
              }
            />
          </div>
          <div className="w-80 h-48">
            <Card
              title={'Deploy a contract'}
              description={'The first step for an on-chain adventure.'}
            />
          </div>
        </div>
      </Container>
    </>
  )
}

export default Home

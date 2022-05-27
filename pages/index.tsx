import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import InputForm from '../components/InputForm'
import {useWallet} from "../services/providers/MintbaseWalletContext";

const Home = () => {
  const { isConnected } = useWallet()

  return (
    <>
      <Head>
        <title>Empowering Citizen Scientists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Container className="flex justify-center my-24" >
         <InputForm></InputForm>
      </Container>
    </>
  )
}

export default Home

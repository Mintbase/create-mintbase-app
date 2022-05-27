import Head from 'next/head'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import InputForm from '../components/InputForm'
import {useWallet} from "../services/providers/MintbaseWalletContext";
import Header from '../components/Header';
import Card from '../components/Card';
import birdPic from '../components/bird-hero.webp'


const Home = () => {
  const { isConnected } = useWallet()

  return (
    <>
    <Header/>
      <Head>
        <title>Empowering Citizen Scientists</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
        { !isConnected &&
        <>
      <Container className="flex justify-center my-24" >
         <InputForm></InputForm>
      </Container>
            <Container className="flex justify-center my-24" >
            <Card title="Birds of Berlin" team="" description='Help the Natural Science Museum and discover a new side of the city.' deadline="" picture={birdPic}/>
          </Container>
     </>
        }
    </>
  )
}

export default Home

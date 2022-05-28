import Head from 'next/head'
import Link from 'next/link'
import Hero from '../components/Hero'
import Container from '../components/Layout/Container'
import {useWallet} from "../services/providers/MintbaseWalletContext";
import Header from '../components/Header';
import Card from '../components/Card';
import birdPic from '../assets/bird-hero.webp'
import kidsPic from '../assets/kids.jpeg'
import forestPic from '../assets/forest.webp'


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
            { isConnected &&
                <>
                    <Container >
                        <Link href="/birds-of-berlin">
                            <Card title="Birds of Berlin" team="" description='Help the Natural Science Museum and discover a new side of the city.' deadline="" picture={birdPic}/>
                        </Link>
                        <Card title="Young explorers at the lake" team="" description='Help the Natural Science Museum and discover a new side of the city.' deadline="" picture={kidsPic}/>
                        <Card title="Deforestation in Brandenburg" team="" description='Help the Natural Science Museum and discover a new side of the city.' deadline="" picture={forestPic}/>
                    </Container>
                    <Container >
                    </Container>
                </>
            }
        </>
    )
}

export default Home

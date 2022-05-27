import Head from 'next/head'
import Link from 'next/link'
import ProjectHero from '../../components/ProjectHero'
import Container from '../../components/Layout/Container'
import InputForm from '../../components/InputForm'
import {useWallet} from "../../services/providers/MintbaseWalletContext";
import Header from '../../components/Header';
import Card from '../../components/Card';
import birdPic from '../../components/bird-hero.webp'
import kidsPic from '../../components/kids.jpeg'
import forestPic from '../../components/forest.webp'


const Home = () => {
  const { isConnected } = useWallet()

  return (
    <>
    <Header/>
    <ProjectHero />
    <Container>
    <InputForm/>
    </Container>
    </>
  )
}

export default Home

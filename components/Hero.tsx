import Navbar from '../components/Navbar'

import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbButton, MbAction, EState } from 'mintbase-ui'

import Link from 'next/link'
import Image from 'next/image'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <div
        className="w-full py-24 px-6 bg-cover bg-no-repeat bg-center relative z-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1457364887197-9150188c107b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80')",
        }}
      >
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-xl leading-tight md:text-3xl text-center text-gray-100 mb-3">
            Build everything you imagine
          </h1>
          <p className="text-md md:text-lg text-center text-white ">
            Cheap & scalable infrastructure for your NFT project
          </p>

          <Link href="https://docs.mintbase.io/dev/getting-started" passHref>
            <MbAction state={EState.ACTIVE}>Learn how</MbAction>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Hero

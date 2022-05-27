import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbText } from 'mintbase-ui'

import WalletConnectButton from './WalletConnectButton'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <>
      <div className="w-full py-24 px-6 bg-cover bg-no-repeat bg-center relative z-10 dark:bg-mb-background">
        <div className="container flex flex-col gap-8 max-w-4xl mx-auto text-center justify-center">
          <MbText className="heading-130 text-white">
            Empowering Citizen Scientists
          </MbText>
          <MbText className="text-white">
            Collecting environmental data and rewarding the people behind it
          </MbText>
          <MbText className="text-white">
            Authenticate with your NEAR wallet to start sharing your observations
          </MbText>

          <div className="items-center justify-center">
            <WalletConnectButton />
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero

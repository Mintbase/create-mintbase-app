import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbButton, MbText } from 'mintbase-ui'
import WalletConnectButton from './WalletConnectButton'

import styles from './Hero.module.css'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
        <div className={styles.hero}>
          <MbText className="heading-130 text-white">
            Empowering Citizen Scientists
          </MbText>
          <MbText className="text-white">
            Research, discover and get rewarded for your contributions.
          </MbText>
          <h2 className={styles.explore}>Explore projects</h2>
        </div>
  )
}

export default Hero

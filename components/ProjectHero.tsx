import { useWallet } from '../services/providers/MintbaseWalletContext'
import { MbButton, MbText } from 'mintbase-ui'
import WalletConnectButton from './WalletConnectButton'

import styles from './ProjectHero.module.css'

const Hero = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
        <div className={styles.projectHero}>
          <h2>
            Birds of Berlin
          </h2>
          <h3 >
            Project description.
          </h3>
        </div>
  )
}

export default Hero

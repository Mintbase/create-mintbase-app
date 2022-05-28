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
            NABU Germany is compiling a study on our domestic birds. Support them by providing visual proof of the observed bird, your observations at the time and the location it was seen.
          </h3>
        </div>
  )
}

export default Hero

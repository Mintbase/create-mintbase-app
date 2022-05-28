import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'
import WalletConnectButton from './WalletConnectButton'
import styles from './Header.module.css'

const Header = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <header className={styles.header}>
        <Link href="/" passHref>
          <a className="py-6 w-full text-center md:text-left md:w-auto text-gray-600 no-underline flex justify-center items-center">
            Research Hub
          </a>
        </Link>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex flex-row items-center space-x-2">
            {isConnected && (
              <p className="text-sm py-2 px-3">
                Hi, {wallet?.activeAccount?.accountId}
              </p>
            )}
                        <WalletConnectButton />

          </div>
        </div>
    </header>
  )
}

export default Header

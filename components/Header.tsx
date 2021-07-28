import Link from 'next/link'
import { useWallet } from '../services/providers/MintbaseWalletContext'

const Header = () => {
  const { wallet, isConnected, details } = useWallet()
  return (
    <header className="w-full px-6 bg-white">
      <div className="container mx-auto max-w-8xl md:flex justify-between items-center">
        <Link href="/" passHref>
          <a className="py-6 w-full text-center md:text-left md:w-auto text-gray-600 no-underline flex justify-center items-center">
            Mintbase Engineering
          </a>
        </Link>

        <div className="w-full md:w-auto mb-6 md:mb-0 text-center md:text-right">
          <div className="flex flex-row items-center space-x-2">
            {isConnected && (
              <p className="text-sm py-2 px-3">
                Hi, {wallet?.activeAccount?.accountId}
              </p>
            )}
            <button
              className="inline-block no-underline bg-black text-white text-sm py-2 px-3"
              onClick={
                isConnected
                  ? () => {
                      wallet?.disconnect()
                      window.location.reload()
                    }
                  : () => {
                      wallet?.connect({ requestSignIn: true })
                    }
              }
            >
              {isConnected ? 'Disconnect' : 'Connect'}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header

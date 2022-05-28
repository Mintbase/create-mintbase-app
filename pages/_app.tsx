import type { AppProps } from 'next/app'
import { WalletProvider } from '../services/providers/MintbaseWalletContext'

import 'tailwindcss/tailwind.css'

import Base from '../components/Layout/Base'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
        <Base>
          <Component {...pageProps} />
        </Base>
    </WalletProvider>
  )
}
export default MyApp

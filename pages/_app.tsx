import type { AppProps } from 'next/app'
import { WalletProvider } from '../services/providers/MintbaseWalletContext'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../services/apolloClient'

import 'tailwindcss/tailwind.css'

import {
  GRAPH_MAINNET_HTTPS_URI,
  GRAPH_TESTNET_HTTPS_URI,
} from '../constants/mintbase'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo({
    ...pageProps,
    network: {
      graphUri:
        process.env.NEXT_PUBLIC_MINTBASEJS_NETWORK === 'testnet'
          ? GRAPH_TESTNET_HTTPS_URI
          : GRAPH_MAINNET_HTTPS_URI,
    },
  })

  return (
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  )
}
export default MyApp

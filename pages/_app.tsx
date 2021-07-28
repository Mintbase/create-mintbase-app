import type { AppProps } from 'next/app'
import { WalletProvider } from '../services/providers/MintbaseWalletContext'
import { ApolloProvider } from '@apollo/client'
import { useApollo } from '../services/apolloClient'

import 'tailwindcss/tailwind.css'

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  return (
    <WalletProvider apiKey={process.env.NEXT_PUBLIC_MINTBASEJS_API_KEY || ''}>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </WalletProvider>
  )
}
export default MyApp

import { Chain, Network, Wallet } from 'mintbase'
import {
  createContext,
  ReactNode,
  useEffect,
  useState,
  useContext,
} from 'react'

interface IWalletProvider {
  network?: Network
  chain?: Chain
  apiKey: string
  children?: ReactNode
}

interface IWalletConsumer {
  wallet: Wallet | undefined
  isConnected: boolean
  details: {
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }
}

// @ts-ignore
export const WalletContext = createContext<{
  wallet: Wallet | undefined
  details: {
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }
  isConnected: boolean
}>({
  wallet: undefined,
  details: {
    accountId: '',
    balance: '',
    allowance: '',
    contractName: '',
  },
  isConnected: false,
})

export const WalletProvider = (props: IWalletProvider) => {
  const { network, chain, apiKey, children } = props
  const [wallet, setWallet] = useState<Wallet | undefined>()
  const [details, setDetails] = useState<{
    accountId: string
    balance: string
    allowance: string
    contractName: string
  }>({
    accountId: '',
    balance: '',
    allowance: '',
    contractName: '',
  })
  const [connected, setConnected] = useState(false)

  const initWallet = async () => {
    const { data: walletData, error } = await new Wallet().init({
      networkName: network ?? Network.testnet,
      chain: chain ?? Chain.near,
      apiKey: apiKey,
    })

    if (error) {
      console.error(error)
      return
    }

    const { wallet, isConnected } = walletData
    setWallet(wallet)
    if (isConnected) {
      try {
        const { data: details } = await wallet.details()
        setDetails(details)
        setConnected(true)
      } catch (err) {
        console.error(err)
      }
    }
  }

  useEffect(() => {
    initWallet()
  }, [network])

  return (
    <WalletContext.Provider value={{ wallet, details, isConnected: connected }}>
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => useContext<IWalletConsumer>(WalletContext)

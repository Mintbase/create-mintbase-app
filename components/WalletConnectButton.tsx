import { EState, MbButton } from 'mintbase-ui'
import { useWallet } from '../services/providers/MintbaseWalletContext'

const WalletConnectButton = () => {
  const { wallet, isConnected, details } = useWallet()

  return (
    <MbButton
      label={isConnected ? `Disconnect ${details.accountId}` : 'Connect NEAR wallet'}
      state={EState.ACTIVE}
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
    />
  )
}

export default WalletConnectButton

import { useEffect, useState } from "react";
import MintbaseLogo from "./MintbaseLogo";
import "./App.css";
import { Wallet, Chain, Network } from "mintbase";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  max-width: 100vw;
`;

const Header = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Link = styled.a`
  color: white;
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  height: 50px;
  margin: 10px;
`;

const DetailsContainer = styled.div`
  max-width: 300px;
`;

const Details = styled.p`
  font-size: 18px;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [details, setDetails] =
    useState<{
      accountId: string;
      balance: string;
      allowance: string;
      contractName: string;
    }>();
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const initWallet = async () => {
    const { data: walletData, error } = await new Wallet().init({
      networkName: Network.testnet,
      chain: Chain.near,
      apiKey: "1deeae7f-a3cb-4479-9b18-f657e75ccc82",
    });

    if (error) {
      console.error(error);
    }

    const { wallet, isConnected } = walletData;

    if (isConnected) {
      try {
        const { data: details } = await wallet.details();

        setDetails(details);
      } catch (error) {
        console.log(error);
      }
    }

    setWallet(wallet);
    setIsLoggedIn(isConnected);
  };

  const handleConnect = async (shouldRequest: boolean) => {
    if (!wallet) return;
    await wallet.connect({ requestSignIn: shouldRequest || false });
  };

  const handleDisconnect = () => {
    if (!wallet) return;
    wallet.disconnect();
    window.location.reload();
  };

  useEffect(() => {
    initWallet();
  }, []);

  return (
    <Container>
      <Header>
        <LogoContainer>
          <MintbaseLogo />
          <Link href="https://github.com/mintbase/mintbase-js">
            Mintbase.js
          </Link>
        </LogoContainer>

        <p>{isLoggedIn ? "You are connected!" : "You are disconnected!"}</p>

        {isLoggedIn && details && (
          <DetailsContainer>
            <Details>Account: {details?.accountId}</Details>
            <Details>Balance: {details?.balance} N</Details>
          </DetailsContainer>
        )}

        <ButtonsContainer>
          {!isLoggedIn && (
            <Button onClick={() => handleConnect(true)}>Connect</Button>
          )}
          {isLoggedIn && (
            <Button onClick={() => handleDisconnect()}>Disconnect</Button>
          )}
        </ButtonsContainer>
      </Header>
    </Container>
  );
}

export default App;

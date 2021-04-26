import { useEffect, useState } from 'react';
import MintbaseLogo from './MintbaseLogo';
import './App.css';
import { Wallet, Chain, Network } from 'mintbase';
import styled from 'styled-components';

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
	const [details, setDetails] = useState<{
		accountId: string;
		balance: string;
		allowance: string;
		contractName: string;
	}>();
	const [wallet, setWallet] = useState<Wallet>(new Wallet({ chain: Chain.near, networkName: Network.testnet }));

	const initWallet = async () => {
		const wallet = new Wallet({ chain: Chain.near, networkName: Network.testnet });
		await wallet.connect({ requestSignIn: false });
		setWallet(wallet);
	};

	const handleConnect = async (shouldRequest: boolean) => {
		if (!wallet) return;
		await wallet.connect({ requestSignIn: shouldRequest || false });
	};

	const handleDisconnect = (shouldRequest: boolean) => {
		if (!wallet) return;
		wallet.disconnect();
		window.location.reload();
	};

	const handleIsConnected = async () => {
		if (!wallet) return;
		try {
			const details = await wallet.details();
			setDetails(details);
		} catch (error) {
			window.location.reload();
		}
	};

	useEffect(() => {
		initWallet();
	}, []);

	useEffect(() => {
		if (!wallet) return;

		if (wallet.isConnected()) {
			setIsLoggedIn(true);

			handleIsConnected();
		}
	}, [wallet]);

	return (
		<Container>
			<Header>
				<LogoContainer>
					<MintbaseLogo />
					<Link href="https://github.com/mintbase/mintbase-js">Mintbase.js</Link>
				</LogoContainer>

				<p>{isLoggedIn ? 'You are connected!' : 'You are disconnected!'}</p>

				{isLoggedIn && details && (
					<DetailsContainer>
						<Details>Account: {details?.accountId}</Details>
						<Details>Balance: {details?.balance} N</Details>
					</DetailsContainer>
				)}

				<ButtonsContainer>
					{!isLoggedIn && <Button onClick={() => handleConnect(true)}>Connect</Button>}
					{isLoggedIn && <Button onClick={() => handleDisconnect(true)}>Disconnect</Button>}
				</ButtonsContainer>
			</Header>
		</Container>
	);
}

export default App;

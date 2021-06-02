import * as React from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';

import styled from 'styled-components';
import Login from './components/Login';
import Jobs from './components/Jobs';
import { Error, ErrorText } from './components/ui/Error';

const Container = styled.div`
	min-width: 600px;
	max-width: 800px;
	min-height: 400px;
	max-width: 600px;
	overflow: auto;
	background-color: #ffffff;
	font-family: 'Montserrat', sans-serif;
	font-weight: 400;
	color: #333333;
`;

interface IJwt {
	userId: string;
	firstName: string;
	lastName: string;
	email: string;
	profileImage: string;
	iat: number;
	exp: number;
}

interface IValid {
	clientId: string;
	isValid: boolean;
}

const App = () => {
	const [isLoggedIn, setIsLoggedIn] = React.useState(false);
	const [clientId, setClientId] = React.useState('');
	const [isLinkedin, setIsLinkedin] = React.useState(false);

	React.useEffect(() => {
		const token = localStorage.getItem('aujwt');
		if (token !== null) {
			const { isValid, clientId } = validateToken(token);

			if (isValid) {
				setIsLoggedIn(true);
				setClientId(clientId);
			} else {
				setIsLoggedIn(false);
				setClientId('');
			}
		}
	}, [isLoggedIn, setIsLoggedIn]);

	React.useEffect(() => {
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			(tabs: any) => {
				if (!tabs[0].url.includes('https://www.linkedin.com/in')) {
					setIsLinkedin(false);
				} else {
					setIsLinkedin(true);
				}
			}
		);
	}, []);

	const validateToken = (token: string): IValid => {
		if (!token) {
			return {
				isValid: false,
				clientId: '',
			};
		}

		const decode: IJwt = jwt_decode(token);

		return {
			isValid: isExpire(decode.exp),
			clientId: decode.userId,
		};
	};

	const isExpire = (exp: number) => {
		const expDate = exp * 1000;
		const now = new Date().getTime();
		return expDate > now;
	};

	const handleOnSuccess = (clientId: string) => {
		setClientId(clientId);
		setIsLoggedIn(true);
	};

	return (
		<Container>
			{isLinkedin ? (
				<>
					{isLoggedIn && clientId ? (
						<Jobs clientId={clientId} />
					) : (
						<Login onSuccess={handleOnSuccess} />
					)}
				</>
			) : (
				<Error>
					<ErrorText>
						This extension will only work on Linkedin Profile Page
					</ErrorText>
				</Error>
			)}
		</Container>
	);
};

export default App;

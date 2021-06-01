import * as React from 'react';
import jwt_decode from 'jwt-decode';

import './App.css';

import axios from 'axios';

import styled from 'styled-components';
import Login from './components/Login';
import Jobs from './components/Jobs';

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

	const validateToken = (token: string) => {
		if (!token) {
			return {
				isValid: false,
				contentId: '',
			};
		}

		const decode: any = jwt_decode(token);

		return {
			isValid: true,
			clientId: decode.userId,
		};
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
				<>
					<p>
						This extension will only work on Linkedin Profile Page
					</p>
				</>
			)}
		</Container>
	);
};

export default App;

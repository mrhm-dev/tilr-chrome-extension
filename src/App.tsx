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
			{isLoggedIn && clientId ? (
				<Jobs clientId={clientId} />
			) : (
				<Login onSuccess={handleOnSuccess} />
			)}
		</Container>
	);
};

export default App;

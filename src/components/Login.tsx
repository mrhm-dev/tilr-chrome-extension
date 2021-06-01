import * as React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import config from '../config';
import Card from './ui/Card';
import Heading from './ui/Heading';
import TextLabel from './ui/TextLabel';
import TextInput from './ui/TextInput';
import Button from './ui/Button';
import logo from '../images/tilr_logo.svg';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #f9fafb;
`;

const LogoWrapper = styled.div`
	width: 150px;
	margin-top: 1rem;
`;

const LogoImage = styled.img`
	width: 100%;
	height: auto;
`;

const CardHolder = styled.div`
	width: 100%;
	padding: 2rem 3rem;
`;

const InputHolder = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
`;

const InputGroup = styled.div`
	width: 100%;
`;

interface LoginProps {
	onSuccess: (clientId: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [error, setError] = React.useState({});
	const [requestError, setRequestError] = React.useState('');

	const handleSubmit = () => {
		console.log(email, password);

		const { isValid, error } = validate(email, password);

		if (isValid) {
			const baseURL =
				config.environment === 'prod'
					? config.prodEndpoint
					: config.devEndpoint;
			const URL = `${baseURL}/auth/login`;
			Axios.post(URL, { email, password })
				.then(({ data }) => {
					console.log('Auth Data', data);
					localStorage.setItem('aujwt', data.token);
					onSuccess(data.userId);
					setError({});
					setRequestError('');
				})
				.catch((e) => {
					console.log('Server Error', e);
					setRequestError(e.response.data.message);
				});
		} else {
			setError(error);
		}
	};

	const validate = (email: String, password: String) => {
		return {
			isValid: true,
			error: {},
		};
	};

	return (
		<Container>
			<LogoWrapper>
				<LogoImage src={logo} />
			</LogoWrapper>
			<Heading>Sign in to your account</Heading>
			<CardHolder>
				<Card>
					<InputHolder>
						<InputGroup>
							<TextLabel>Email Address</TextLabel>
							<TextInput
								type='email'
								value={email}
								name={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
						</InputGroup>
						<InputGroup style={{ marginTop: '1rem' }}>
							<TextLabel>Password</TextLabel>
							<TextInput
								type='password'
								value={password}
								name={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</InputGroup>
						<InputGroup style={{ marginTop: '1.5rem' }}>
							<Button onClick={() => handleSubmit()}>
								Sign in
							</Button>
						</InputGroup>
					</InputHolder>
				</Card>
			</CardHolder>
		</Container>
	);
};

export default Login;

import * as React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import config from '../config';
import Card from './ui/Card';
import Heading from './ui/Heading';
import TextLabel from './ui/TextLabel';
import { TextInput, InvalidInput } from './ui/TextInput';
import Button from './ui/Button';
import logo from '../images/tilr_logo.svg';
import Loading from './ui/Loading';

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

interface ILoginField {
	email?: string;
	password?: string;
}

const Login: React.FC<LoginProps> = ({ onSuccess }) => {
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');
	const [isLoading, setIsLoading] = React.useState(false);
	const [error, setError] = React.useState<ILoginField>({});
	const [responseError, setResponseError] = React.useState('');

	// login form submit handler
	const handleSubmit = () => {
		const { isValid, error } = validate(email, password);

		if (isValid) {
			setIsLoading(true);
			const baseURL =
				config.environment === 'prod'
					? config.prodEndpoint
					: config.devEndpoint;
			const URL = `${baseURL}/auth/login`;
			Axios.post(URL, { email, password })
				.then(({ data }) => {
					console.log('Auth Data', data);
					localStorage.setItem('aujwt', data.token);
					// state lifting - pass client id to app.tsx
					onSuccess(data.userId);
					setError({});
					setResponseError('');
					setIsLoading(false);
				})
				.catch((e) => {
					console.log('Server Error', e);
					setResponseError(e.response.data.message);
					setIsLoading(false);
				});
		} else {
			setError(error);
		}
	};

	// custom validator function
	const validate = (email: String, password: String) => {
		const error: ILoginField = {};

		if (!email) {
			error.email = 'Email field can not be empty';
		} else if (
			!email.match(
				/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
			)
		) {
			error.email = 'Invalid email format';
		}

		if (!password) {
			error.password = 'Password field can not be empty';
		} else if (password.length < 6) {
			error.password =
				'Password must be greater than or equal 6 characters';
		}

		return {
			isValid: Object.keys(error).length === 0,
			error,
		};
	};

	return (
		<>
			{isLoading ? (
				<Loading isLoading={isLoading} />
			) : (
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
										onChange={(e) =>
											setEmail(e.target.value)
										}
										isError={Boolean(error.email)}
									/>
									{error.email && (
										<InvalidInput>
											{error.email}
										</InvalidInput>
									)}
								</InputGroup>
								<InputGroup style={{ marginTop: '1rem' }}>
									<TextLabel>Password</TextLabel>
									<TextInput
										type='password'
										value={password}
										name={password}
										onChange={(e) =>
											setPassword(e.target.value)
										}
										isError={Boolean(error.password)}
									/>
									{error.password && (
										<InvalidInput>
											{error.password}
										</InvalidInput>
									)}
								</InputGroup>
								<InputGroup style={{ marginTop: '1.5rem' }}>
									<Button onClick={() => handleSubmit()}>
										Sign in
									</Button>
								</InputGroup>
							</InputHolder>
							{responseError && (
								<div
									style={{
										textAlign: 'center',
										padding: '0.5rem',
										color: 'red',
									}}
								>
									{responseError}
								</div>
							)}
						</Card>
					</CardHolder>
				</Container>
			)}
		</>
	);
};

export default Login;

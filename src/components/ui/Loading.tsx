import * as React from 'react';
import styled from 'styled-components';
import ClipLoader from 'react-spinners/ClipLoader';

const Container = styled.div`
	width: 600px;
	height: 400px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

interface LoadingProps {
	isLoading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
	return (
		<Container>
			<ClipLoader loading={isLoading} size={35} color='#5046e4' />
		</Container>
	);
};

export default Loading;

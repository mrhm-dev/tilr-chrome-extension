import styled from 'styled-components';

interface ITextInput {
	isError?: boolean;
}

export const TextInput = styled.input<ITextInput>`
	width: 100%;
	padding: 0.5rem 0.25rem;
	outline: none;
	border: ${(props) => (props.isError ? '1px solid red' : '1px solid #ddd')};
	border-radius: 0.25rem;
	font-size: 16px;
	&:focus {
		outline: none;
		border: 1px solid #1f97bb;
	}
`;

export const InvalidInput = styled.p`
	margin-top: 0.25rem;
	color: red;
	font-size: 0.8rem;
`;

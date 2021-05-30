import styled from 'styled-components';

const TextInput = styled.input`
	width: 100%;
	padding: 0.5rem 0.25rem;
	outline: none;
	border: 1px solid #ddd;
	border-radius: 0.25rem;
	font-size: 16px;
	&:focus {
		outline: none;
		border: 1px solid #1f97bb;
	}
`;

export default TextInput;

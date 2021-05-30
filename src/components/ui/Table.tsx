import * as React from 'react';
import styled from 'styled-components';

export const Table = styled.table`
	width: 100%;
	border: none;
	outline: none;
	border-collapse: collapse;
	text-align: left;
`;

export const THead = styled.thead`
	width: 100%;
	background-color: #f9fafb;
	color: #666;
	text-transform: uppercase;
	border-bottom: 1px solid #dddddd;
`;

export const TBody = styled.tbody`
	width: 100%;
	color: #666;
`;

export const TR = styled.tr`
	font-weight: 500;
	border-bottom: 1px solid #dddddd;
	&:last-child {
		border-bottom: none;
	}
`;

export const TH = styled.th`
	padding: 1rem;
	/* border-bottom: 1px solid #dddddd; */
`;

export const TD = styled.td`
	padding: 1rem;
`;

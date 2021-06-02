import * as React from 'react';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
`;

const Rank = styled.div`
	display: flex;
	align-items: flex-end;
`;

interface RankBarProps {
	isColor?: boolean;
	height: string;
}

const RankBar = styled.div<RankBarProps>`
	width: 0.25rem;
	height: ${(props) => props.height};
	background: ${(props) => (props.isColor ? '#5046e4' : '#dddddd')};
	border-radius: 0.25rem;
	margin-left: 0.12rem;
`;

const RankText = styled.h3`
	color: #999;
	font-size: 0.8rem;
	text-align: right;
	margin-top: 0.25rem;
`;

interface MeterProps {
	rank: number | string;
	rankText?: string;
}

const Meter: React.FC<MeterProps> = ({ rank, rankText }) => {
	console.log('rank', rank);
	console.log('rankText', rankText);
	return (
		<Container>
			<Rank>
				<RankBar
					height='.40rem'
					isColor={
						typeof rank === 'number' && rank >= 0 ? true : false
					}
				/>
				<RankBar
					height='.65rem'
					isColor={
						typeof rank === 'number' && rank >= 1 ? true : false
					}
				/>
				<RankBar
					height='.90rem'
					isColor={
						typeof rank === 'number' && rank >= 2 ? true : false
					}
				/>
				<RankBar
					height='1.15rem'
					isColor={
						typeof rank === 'number' && rank >= 3 ? true : false
					}
				/>
			</Rank>
			<RankText>{rankText ? rankText : rank}</RankText>
		</Container>
	);
};

export default Meter;

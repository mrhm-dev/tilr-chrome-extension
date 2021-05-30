import * as React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import config from '../config';
import { Table, TBody, TD, TH, THead, TR } from './ui/Table';

const Container = styled.div`
	width: 100%;
`;

const JobTitle = styled.h2`
	font-size: 0.8rem;
	font-weight: 600;
	color: #5046e4;
`;

interface JobsProps {
	clientId: string;
}

const Jobs: React.FC<JobsProps> = ({ clientId }) => {
	const [jobs, setJobs] = React.useState([]);
	const [responseError, setResponseError] = React.useState('');

	React.useEffect(() => {
		const baseURL =
			config.environment === 'prod'
				? config.prodEndpoint
				: config.devEndpoint;

		const URL = `${baseURL}/client/${clientId}/jobsFromText`;
		console.log('URL', URL);

		// TODO: verify token later
		const token = localStorage.getItem('aujwt');
		console.log('token from jobs page', token);
		Axios.post(
			URL,
			{ text: 'Communications' },
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
			.then(({ data }) => {
				setJobs(data);
				console.log('jobs', data);
			})
			.catch((e) => {
				console.log(e);
				console.log(e.response);
				setResponseError(e.response.data.message);
			});
	}, []);

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toDateString().substr(4);
	};

	return (
		<Container>
			<Table>
				<THead>
					<TR>
						<TH>Title</TH>
						<TH>Posted Date</TH>
						<TH>Location</TH>
						<TH>Match Level</TH>
					</TR>
				</THead>
				<TBody>
					{jobs.length > 0 ? (
						<>
							{jobs.map((job: any) => (
								<TR key={job.jobId}>
									<TD>
										<JobTitle>{job.jobTitle}</JobTitle>
									</TD>
									<TD>{formatDate(job.posted)}</TD>
									<TD>
										{job.location ? job.location : 'N/A'}
									</TD>
									<TD>
										{job.rankText ? job.rankText : job.rank}
									</TD>
								</TR>
							))}
						</>
					) : (
						<p>no jobs found</p>
					)}
				</TBody>
			</Table>
		</Container>
	);
};

export default Jobs;

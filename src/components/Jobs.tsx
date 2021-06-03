import * as React from 'react';
import styled from 'styled-components';
import Axios from 'axios';
import config from '../config';
import { Table, TBody, TD, TH, THead, TR } from './ui/Table';
import Button from './ui/Button';
import Meter from './ui/Meter';
import Loading from './ui/Loading';

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
	const [text, setText] = React.useState('Communication');
	const [name, setName] = React.useState('Guest');
	const [isLoading, setIsLoading] = React.useState(true);
	const [responseError, setResponseError] = React.useState('');

	React.useEffect(() => {
		// send message to content script to get name of the current Linkedin profile
		chrome.tabs.query(
			{ active: true, currentWindow: true },
			(tabs: any) => {
				chrome.tabs.sendMessage(
					tabs[0].id,
					{ type: 'get_name' },
					(response) => {
						// getting response back and updating state
						setName(response.name);
					}
				);
			}
		);
	}, []);

	// send ajax request to get back jobs based on Linkedin profile
	React.useEffect(() => {
		const baseURL =
			config.environment === 'prod'
				? config.prodEndpoint
				: config.devEndpoint;

		const URL = `${baseURL}/client/${clientId}/jobsFromText`;

		// TODO: verify token later
		const token = localStorage.getItem('aujwt');

		Axios.post(
			URL,
			{ text },
			{
				headers: {
					authorization: `Bearer ${token}`,
				},
			}
		)
			.then(({ data }) => {
				setJobs(data);
				setIsLoading(false);
				console.log('jobs', data);
			})
			.catch((e) => {
				console.log(e);
				console.log(e.response);
				setResponseError(e.response.data.message);
				setIsLoading(false);
			});
	}, [text, name]);

	// date formatter
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toDateString().substr(4);
	};

	if (isLoading) {
		return <Loading isLoading={isLoading} />;
	}

	return (
		<Container>
			<div style={{ textAlign: 'center', padding: '0.5rem' }}>
				<Button
					onClick={() => {
						chrome.tabs.query(
							{ active: true, currentWindow: true },
							(tabs: any) => {
								chrome.tabs.sendMessage(
									tabs[0].id,
									{
										type: 'get_html',
									},
									(response) => {
										console.log('Response', response);
										setText(response.text);
									}
								);
							}
						);
					}}
				>
					See how {name} matches to your job{' '}
				</Button>
			</div>
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
					{jobs.length > 0 && (
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
										<Meter
											rank={job.rank}
											rankText={job.rankText}
										/>
									</TD>
								</TR>
							))}
						</>
					)}
				</TBody>
			</Table>
			{!isLoading && jobs.length === 0 && (
				<div
					style={{
						textAlign: 'center',
						padding: '1rem',
						color: '#5046e4',
						fontSize: '1rem',
					}}
				>
					<p>No Jobs Found</p>
				</div>
			)}
		</Container>
	);
};

export default Jobs;

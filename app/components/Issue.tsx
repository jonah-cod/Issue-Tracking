import React from "react";
import { Table } from "@radix-ui/themes";

interface Issue {
	id: number;
	title: string;
	description: string;
	status: string;
	createdAt: Date;
	updatedAt: Date;
}

interface IssueProps {
	issue: Issue;
}

const formatDate = (date:Date)=>{
    return new Date(date).toDateString()
}

const Issue: React.FC<IssueProps> = ({ issue }) => {
	return (
		<Table.Row>
			<Table.RowHeaderCell>{issue.id}</Table.RowHeaderCell>
			<Table.RowHeaderCell>{issue.title}</Table.RowHeaderCell>
			<Table.RowHeaderCell>{issue.description}</Table.RowHeaderCell>
			<Table.RowHeaderCell>{issue.status}</Table.RowHeaderCell>
			<Table.RowHeaderCell>{formatDate(issue.createdAt)}</Table.RowHeaderCell>
		</Table.Row>
	);
};

export default Issue;

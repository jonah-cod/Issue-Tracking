import React, { useEffect, useState } from "react";
import { Box, Table } from "@radix-ui/themes";
import {  z } from "zod";
import IssueRow from "./Issue";

interface Issue{
    id   :       number;      
  title  :    string;  
  description :string; 
  status    :  string;
  createdAt :  Date;
  updatedAt :  Date;
}


const IssueListing: React.FC = () => {
	const [issues, setIssues] = useState<Issue[]>([]);

	async function fetchIssues() {
		try {
			const res = await fetch("api/issues");
			const issues: Issue[] = await res.json();
			setIssues(issues);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchIssues();
	}, []);

	return (
		<Box>
			{issues.length ? (
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Created At</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                    {issues.map((issue) =><IssueRow key={issue.id} issue={issue}/>)}
                    </Table.Body>
                </Table.Root>
				
			) : (
				<p>No data</p>
			)}
		</Box>
	);
};

export default IssueListing;

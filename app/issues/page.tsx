"use client";
import React from "react";
import { Button, Text, Box } from "@radix-ui/themes";
import Link from "next/link";
import IssueListing from "../components/IssueListing";

const IssuesPage = () => {
	return (
		<Box>
			<div className="flex justify-between">
				<Text className="font-semibold">Reported Issues</Text>
				<Button>
					<Link href="/issues/new">New Issue</Link>
				</Button>
			</div>
      <IssueListing/>
		</Box>
	);
};

export default IssuesPage;

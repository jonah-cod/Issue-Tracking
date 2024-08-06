"use client";
import React from "react";
import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";

const NavBar = () => {
	const currentPath = usePathname();
	const links = [
		{ label: "Dashboard", link: "/" },
		{ label: "Issues", link: "/issues" },
	];
	return (
		<nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center justify-between">
			<Link href="/">
				<AiFillBug />
			</Link>
			<ul className="flex space-x-6">
				{links.map((link) => (
					<li key={link.label}>
						<Link
							className={`${
								link.link === currentPath
									? "text-zinc-900"
									: "text-zinc-500"
							} hover:text-zinc-800 transition-colors`}
							href={link.link}>
							{link.label}
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
};

export default NavBar;

import {
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { FC, MouseEvent, useState } from "react";

export const links = [
	{ name: "home", pageroute: "/" },
	{ name: "about", pageroute: "/about" },
	{
		name: "company",
		pageroute: "/company",
		subroutes: [
			{ name: "social impact", subroute: "#social" },
			{ name: "our team", subroute: "#team" },
			{ name: "careers", subroute: "#career" },
			{ name: "contact", subroute: "#contact" },
		],
	},
];

interface IList1 {
	mobile?: boolean;
}

export const List1: FC<IList1> = ({ mobile }) => {
	return (
		<List
			sx={
				mobile
					? { display: "grid", width: "100%" }
					: { display: "flex", justifyContent: "flex-start", width: "unset" }
			}
		>
			{links.map(link => {
				return (
					<ListItem key={link.name}>
						<L1Item {...link} />
					</ListItem>
				);
			})}
		</List>
	);
};

interface IL1Item {
	name: string;
	pageroute: string;
	subroutes?: {
		name: string;
		subroute: string;
	}[];
}

export const L1Item: FC<IL1Item> = ({ name, pageroute, subroutes }) => {
	const router = useRouter();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handleClick = (
		e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>,
	) => {
		e.stopPropagation();
		e.preventDefault();
		setAnchorEl(e.currentTarget);
		router.route !== pageroute && router.push(pageroute);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};
	return (
		<>
			<ListItemButton
				onClick={handleClick}
				sx={{ borderRadius: 1 }}
				component="a"
				role="link"
			>
				<ListItemText>
					<Typography
						variant="body2"
						sx={{
							color: router.route === pageroute ? "primary.main" : "#828282",
							textTransform: "capitalize",
							px: 2,
						}}
					>
						{name}
					</Typography>
				</ListItemText>
			</ListItemButton>
			{subroutes && (
				<Menu
					open={open}
					onClose={handleClose}
					anchorEl={anchorEl}
					sx={{ zIndex: 99999 }}
				>
					{subroutes.map(({ name, subroute }) => (
						<MenuItem
							key={name}
							onClick={() => {
								router.route !== pageroute && router.push(pageroute + subroute);
								handleClose();
							}}
							component="a"
							role="link"
							href={subroute}
							sx={{ textTransform: "capitalize" }}
						>
							{name}
						</MenuItem>
					))}
				</Menu>
			)}
		</>
	);
};

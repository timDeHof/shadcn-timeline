

export interface TimelineElement {
	id: number;
	title: string;
	date: string;
	description: string;
	icon?: React.ReactNode;
	color?: string;

}

export const timelineData: TimelineElement[] = [
	{
		id: 1,
		title: "First event",
		date: "2022-01-01",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.",

	},
	{
		id: 2,
		title: "Second event",
		date: "2022-02-01",
		description:
			"Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit.",

	},
	{
		id: 3,
		title: "Third event",
		date: "2022-03-01",
		description:
			"Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae.",

	},
];

export type TimelineData = (typeof timelineData)[number];

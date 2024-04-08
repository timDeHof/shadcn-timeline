import { TimelineLayout } from "@/components/timeline/timeline-layout";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { timelineData } from "./data";
export default function Home() {
	return (
		<main className='flex min-h-screen flex-col items-center p-4 bg-background md:px-24 gap-4'>
			<div className='max-w-5xl w-full items-center justify-between flex'>
				<Link href='#' className='text-4xl font-bold text-muted-foreground'>
					shadcn-timeline
				</Link>
				<Link
					href='https://github.com/timDeHof/shadcn-timeline'
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"h-10 w-10",
					)}>
					<GitHubLogoIcon className='size-10 text-muted-foreground' />
				</Link>
			</div>
			<div className='w-fit'>
				<TimelineLayout items={timelineData} />
			</div>
		</main>
	);
}

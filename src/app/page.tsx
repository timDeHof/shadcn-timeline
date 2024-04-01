import { cookies } from "next/headers";
import { timelineLayout } from "@/components/timeline/timeline-layout";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export default function Home() {
	const layout = cookies().get("react-resizable-panles:layout");
	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

	return (
		<main className='flex min-h-screen flex-col items-center justify-center  p-4 md:px-24 py-32 gap-4'>
			<div className='max-w-5xl w-full items-center justify-between flex'>
				<Link href='#' className='text-4xl font-bold text-gray-600'>
					shadcn-timeline
				</Link>
				<Link
					href='#'
					className={cn(
						buttonVariants({ variant: "ghost", size: "icon" }),
						"h-10 w-10",
					)}>
					<GitHubLogoIcon className='size-7 text-muted-foreground' />
				</Link>
			</div>
		</main>
	);
}

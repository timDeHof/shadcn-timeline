import { TimelineLayout } from "@/components/timeline/timeline-layout";
import Link from "next/link";
import { GitHubLogoIcon, CalendarIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { timelineData } from "./data";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Highlight, themes } from "prism-react-renderer";

const installCode = `# 1. Clone the repository
git clone https://github.com/timDeHof/shadcn-timeline.git

# 2. Open the folder
cd shadcn-timeline

# 3. Install dependencies
npm install

# 4. Copy the timeline components to your project
# Copy from: /src/app/components/timeline/timeline-layout.tsx & timeline.tsx`;

const usageCode = `# Add to your component:
import { TimelineLayout } from "@/components/timeline/timeline-layout";

# Copy the timeline components to:
/src/components/timeline/timeline-layout.tsx
/src/components/timeline/timeline.tsx`;

const exampleCode = `import { TimelineLayout } from "@/components/timeline/timeline-layout";

export default function MyTimeline() {
	return (
		<TimelineLayout
			items={timelineData}
			size="md"
			iconColor="primary"
			connectorColor="primary"
			customIcon={<CalendarIcon />}
			animate={true}
		/>
	);
}`;

const examples = {
	basic: {
		name: "Basic",
		code: `<TimelineLayout
	items={timelineData}
	size="md"
	/>`,
		component: (
			<TimelineLayout items={timelineData} size='md' />
		),
	},
	customIcon: {
		name: "Custom Icon",
		code: `<TimelineLayout
	items={timelineData}
	size="lg"
	iconColor="primary"
	customIcon={<CalendarIcon />}
	/>`,
		component: (
			<TimelineLayout
				items={timelineData}
				size='lg'
				iconColor='primary'
				customIcon={<CalendarIcon />}
			/>
		),
	},
	animated: {
		name: "Animated",
		code: `<TimelineLayout
	items={timelineData}
	size="md"
	animate={true}
	/>`,
		component: (
			<TimelineLayout
				items={timelineData}
				size='md'
				animate={true}
			/>
		),
	},
};

export default function Home() {
	return (
		<div className='container flex min-h-screen w-full flex-col space-y-8 pb-16 pt-6 md:flex-row md:space-x-8 md:space-y-0 md:px-8'>
			{/* Sidebar */}
			<aside className='md:w-64 flex-shrink-0'>
				<div className='sticky top-6'>
					<div className='space-y-4'>
						<div className='flex items-center justify-between'>
							<Link href='#' className='text-2xl font-bold'>
								shadcn-timeline
							</Link>
							<Link
								href='https://github.com/timDeHof/shadcn-timeline'
								className={cn(
									buttonVariants({ variant: "ghost", size: "icon" }),
								)}>
								<GitHubLogoIcon className='size-5' />
							</Link>
						</div>
						<nav className='flex flex-col space-y-2'>
							<Link
								href='#installation'
								className='text-muted-foreground hover:text-foreground'>
								Installation
							</Link>
							<Link
								href='#usage'
								className='text-muted-foreground hover:text-foreground'>
								Usage
							</Link>
							<Link
								href='#examples'
								className='text-muted-foreground hover:text-foreground'>
								Examples
							</Link>
						</nav>
					</div>
				</div>
			</aside>

			{/* Main content */}
			<main className='flex-1 space-y-12'>
				{/* Hero section */}
				<div className='space-y-2'>
					<h1 className='scroll-m-20 text-4xl font-bold tracking-tight'>
						Timeline
					</h1>
					<p className='text-lg text-muted-foreground'>
						A customizable timeline component for displaying chronological
						events.
					</p>
				</div>

				{/* Installation section */}
				<section id='installation' className='space-y-4'>
					<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						Manual Installation
					</h2>
					<p className='text-muted-foreground mb-4'>
						Copy the timeline components into your project structure:
					</p>
					<div className='rounded-lg overflow-hidden'>
						<Highlight
							theme={themes.nightOwl}
							code={installCode}
							language='bash'>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={cn(className, "p-4")} style={style}>
									{tokens.map((line, i) => (
										<div key={i} {...getLineProps({ line })}>
											{line.map((token, key) => (
												<span key={key} {...getTokenProps({ token })} />
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</section>

				{/* Usage section */}
				<section id='usage' className='space-y-4'>
					<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						Usage
					</h2>
					<div className='rounded-lg overflow-hidden'>
						<Highlight theme={themes.nightOwl} code={usageCode} language='tsx'>
							{({ className, style, tokens, getLineProps, getTokenProps }) => (
								<pre className={cn(className, "p-4")} style={style}>
									{tokens.map((line, i) => (
										<div key={i} {...getLineProps({ line })}>
											{line.map((token, key) => (
												<span key={key} {...getTokenProps({ token })} />
											))}
										</div>
									))}
								</pre>
							)}
						</Highlight>
					</div>
				</section>

				{/* Examples section */}
				<section id='examples' className='space-y-6'>
					<h2 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
						Examples
					</h2>
					<div className='grid gap-6'>
						{Object.entries(examples).map(([key, example]) => (
							<Card key={key} id={example.name}>
								<CardHeader>
									<CardTitle className='font-semibold text-xl tracking-tight scroll-m-20'>
										{example.name}
									</CardTitle>
								</CardHeader>
								<CardContent className='group relative my-4 flex flex-col space-y-2 [&_input]:max-w-xs'>
									<Tabs defaultValue='preview' className='w-full mr-auto'>
										<TabsList className='inline-flex h-9 items-center text-muted-foreground w-full justify-start rounded-none border-b bg-transparent p-0'>
											<TabsTrigger
												value='preview'
												className='inline-flex items-center justify-center
 whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'>
												Preview
											</TabsTrigger>
											<TabsTrigger
												value='code'
												className='inline-flex items-center justify-center
 whitespace-nowrap py-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background relative h-9 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none'>
												Code
											</TabsTrigger>
										</TabsList>
										<TabsContent
											value='preview'
											className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative'>
											<div className=' w-full'>
												<div className='flex min-h-[350px] w-full justify-center items-center'>
													{example.component}
												</div>
											</div>
										</TabsContent>
										<TabsContent value='code' className='mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
											<div className='rounded- w-full'>
												<Highlight
													theme={themes.nightOwl}
													code={example.code}
													language='tsx'>
													{({
														className,
														style,
														tokens,
														getLineProps,
														getTokenProps,
													}) => (
														<pre className={cn(className, "my-0 w-full p-4 rounded-md max-h-[350px] overflow-auto")} style={style}>
															{tokens.map((line, i) => (
																<div key={i} {...getLineProps({ line })}>
																	<span className='text-gray-500 mr-4'>
																		{i + 1}
																	</span>
																	{line.map((token, key) => (
																		<span
																			key={key}
																			{...getTokenProps({ token })}
																		/>
																	))}
																</div>
															))}
														</pre>
													)}
												</Highlight>
											</div>
										</TabsContent>
									</Tabs>
								</CardContent>
							</Card>
						))}
					</div>
				</section>
			</main>
		</div>
	);
}

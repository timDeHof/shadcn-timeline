import { Hero, Sidebar, Installation, Usage, Examples } from '@/components/sections';

export default function Home() {
  return (
    <div className="container flex min-h-screen w-full flex-col space-y-8 pb-16 pt-6 md:flex-row md:space-x-8 md:space-y-0 md:px-8">
      <Sidebar />
      <main className="flex-1 space-y-12">
        <Hero />
        <Installation />
        <Usage />
        <Examples />
      </main>
    </div>
  );
}

import TopAppBar from '@/components/layout/TopAppBar';
import SideNav from '@/components/layout/SideNav';
import BottomNavBar from '@/components/layout/BottomNavBar';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <SideNav />
      <div className="md:pl-60 flex flex-col min-h-screen">
        <TopAppBar />
        <main className="flex-1 pb-24 md:pb-8">
          {children}
        </main>
      </div>
      <BottomNavBar />
    </div>
  );
}

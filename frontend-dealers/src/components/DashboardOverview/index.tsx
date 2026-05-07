import Navbar from "@/src/components/Navbar";
import AppSidebar from "@/src/components/AppSidebar";
import Hero from "@/src/app/(authenticated)/dashboard/_components/Hero";
import Evaluations from "@/src/app/(authenticated)/dashboard/_components/Evaluations";

const DashboardOverview = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <AppSidebar />
      <div className="flex min-h-screen flex-1 flex-col md:pl-[280px]">
        <Navbar />
        <main className="flex-1">
          <Hero />
          <Evaluations />
        </main>
      </div>
    </div>
  );
};

export default DashboardOverview;

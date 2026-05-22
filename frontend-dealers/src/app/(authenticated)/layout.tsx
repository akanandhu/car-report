import AppSidebar from "@/src/components/AppSidebar";
import Navbar from "@/src/components/Navbar";

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 md:flex">
      <AppSidebar />
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        <Navbar />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default AuthenticatedLayout;

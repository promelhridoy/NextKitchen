import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardMobileBar from "@/components/dashboard/DashboardMobileBar";
import Footer from "@/components/layout/Footer";

export default function DashboardGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <DashboardSidebar />
      {/* <DashboardMobileBar /> */}
      <div className="flex flex-1 flex-col lg:ml-64">
        <main className="flex-1">
          <div className="  mt-[0rem] lg:mt-[-50rem] px-4 py-6 pb-12 md:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
import AdminSidebar from "@/components/admin/AdminSidebar";
import Footer from "@/components/layout/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col bg-gray-50 dark:bg-gray-950">
      <AdminSidebar />
      <div className="flex flex-1 flex-col lg:ml-64">
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-6 pb-12 md:px-8">{children}</div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

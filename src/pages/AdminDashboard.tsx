// src/pages/admin/AdminDashboardPage.tsx

import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";
import { useMobile } from "@/hooks/ResponsiveHooks";

export default function AdminDashboardPage() {
  const isMobile = useMobile();

  return (
    <div className="flex min-h-screen" dir="rtl">
      
      {isMobile ? (
        <AdminSidebar className="w-full min-h-screen" />
      ) : (
        <>
          <AdminSidebar />

          <AdminContainer
            title="داشبورد ادمین"
            description="اینجا محتوای اصلی داشبورد (لیست کاربران، سفارش‌ها، گزارش‌ها و ...) قرار داده میشود."
          >
            <p className="text-small text-charcoal-700">سلام</p>
          </AdminContainer>
        </>
      )}

    </div>
  );
}

import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import { AdminContainer } from "@/components/Admin/AdminContainer";
import { useMobile } from "@/hooks/ResponsiveHooks";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export default function OwnersPage() {
  const isMobile = useMobile();
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/admin"); 
  };

  return (
    <div className="flex min-h-screen" dir="rtl">
      {!isMobile && <AdminSidebar activeItemId="owners-list" />}

      <section className="flex-1 px-8 py-6" dir="rtl">
        {isMobile && (
          <div className="flex justify-start mb-4">
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1 text-small text-blue-600 font-[Alibaba]"
            >
              <ChevronRight className="w-4 h-4" />
              <span>بازگشت به داشبورد</span>
            </button>
          </div>
        )}

        <AdminContainer
          title="لیست پت اونر ها "
          description="....."
        >
          <p className="text-small text-charcoal-700 font-[Alibaba]">
            سلام
          </p>
        </AdminContainer>
      </section>
    </div>
  );
}

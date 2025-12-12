import { GlobalProviders } from "@/providers/GlobalProviders";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";


const PublicLayout = () => {
  return (
    <div className="font-[alibaba] w-screen h-screen rtl">
      <Toaster
        position="bottom-right"
        richColors={true}
        duration={5000}
        // toastOptions={{
        // 	style: {
        // 		color: "red",
        // 	},
        // }}
      />
      <GlobalProviders>
        <Navbar isUserLoggedin={true} />
        <div className="absolute w-screen mt-13">
          <Outlet />
          <Footer />
        </div>
      </GlobalProviders>
    </div>
  );

}

export default PublicLayout;

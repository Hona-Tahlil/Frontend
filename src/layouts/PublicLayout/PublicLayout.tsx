import { GlobalProviders } from "@/providers/GlobalProviders";
import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import Footer from "@/components/Footer/Footer";

const PublicLayout = () => {
	return (
		<div className="font-[alibaba] ">
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
				<Outlet />
				{/*<Footer />*/}
			</GlobalProviders>
		</div>
	);
};

export default PublicLayout;

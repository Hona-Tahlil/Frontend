import { createBrowserRouter } from "react-router-dom";
import PublicLayout from "@/layouts/PublicLayout/PublicLayout";
import Landing from "@/pages/Landing";
import PetSitterLanding from "@/pages/PetSitterLanding";
import Temp from "@/pages/Temp";
import Test from "@/pages/Test";
import Login from "@/pages/Login";
import AboutUs from "@/pages/AboutUs";
import ForgetPassword from "@/pages/ForgetPassword";
import ChangePassword from "@/pages/ChangePassword";
import Terms from "@/pages/Terms";
import Signup from "@/pages/Signup";
import ExplorePetSitter from "@/pages/ExplorePetSitter";
import AuthLayout from "@/layouts/PublicLayout/AuthLayout";
import ReserveSuccess from "@/pages/ReserveSuccess";
import AdminDashboard from "@/pages/AdminDashboard";
import RegisterPetMobile from "@/pages/RegisterPetMobile";
import MobileLayout from "@/layouts/MobileLayout/MobileLayout";
import VerifySitterPage from "@/pages/Admin/VerifySitterPage";
import SittersPage from "@/pages/Admin/SittersPage";
import OwnersPage from "@/pages/Admin/OwnersPage";
import ReviewsPage from "@/pages/Admin/ReviewsPage";
import ComplaintsPage from "@/pages/Admin/ComplaintsPage";
import BookingsPage from "@/pages/Admin/BookingsPage";
import AccessPage from "@/pages/Admin/AccessPage";




import Dashboard from "@/pages/PetDashboard";
import PetDashboard from "@/pages/PetDashboard";
import Error404 from "@/pages/Error404";

export const router = createBrowserRouter([
	{
		path: "/",
		element: <PublicLayout />,
		children: [
      {
        index: true,
        path: "/",
        element: <Landing />,
      },
      {
        path: "/temp",
        element: <Temp />,
      },
			{
				path: "/pet-sitter",
				element: <PetSitterLanding />,
			},
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/Terms",
        element: <Terms />,
      },
      {
        path: "/AboutUs",
        element: <AboutUs />,
      },
      {
        path: "/ExplorePetSitter",
        element: <ExplorePetSitter />,
      },
      {
        path: "/admin",
        element: <AdminDashboard />,
      },
      {
        path: "/Reserve-Success",
        element: <ReserveSuccess />,
      },
      {
        path: "/Petsitters",
        element: <ExplorePetSitter />,
      },
      {
        path: "/Dashboard/pets",
        element: <PetDashboard />,
      },
      {
        path: "*",
        element: <Error404 />,
      }
		],
	},
	{
		path: "/admin/verify-sitter",
		element: <VerifySitterPage />,
	},
	{
		path: "/admin/verify-sitter/:id",
		element: <VerifySitterPage />,
	},
	{
		path: "/admin/sitters",
		element: <SittersPage />,
	},
	{
		path: "/admin/owners",
		element: <OwnersPage />,
	},
	{
		path: "/admin/reviews",
		element: <ReviewsPage />,
	},
	{
		path: "/admin/complaints",
		element: <ComplaintsPage />,
	},
	{
		path: "/admin/bookings",
		element: <BookingsPage />,
	},
	{
		path: "/admin/access",
		element: <AccessPage />,
	},



	{
		element: <AuthLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
			{
				path: "/forget-password",
				element: <ForgetPassword />,
			},
			{
				path: "/reset-password",
				element: <ChangePassword />,
			},
		],
	},
	// {
	// 	element: <PrivateLayout />,
	// 	children: [
	// 		{
	// 			path: "/EditProfile",
	// 			element: <EditProfile />,
	// 		},
	// 		{
	// 			path: "/DashBoard",
	// 			element: <DashBoard />,
	// 		},
	// 	],
	// },
	// {
	// 	element: <AnotherLayout />,
	// 	children: [
	// 		{
	// 			path: "/login",
	// 			element: <Login />,
	// 		},
	// 		{
	// 			path: "/temp",
	// 			element: <Temp />,
	// 		},
	// 	],
	// },

  
  {
    element: <MobileLayout />,
    children: [
      {
        path: "/RegisterPet",
        element: <RegisterPetMobile />,
      },
    ],
  },
  // {
  // 	element: <PrivateLayout />,
  // 	children: [
  // 		{
  // 			path: "/EditProfile",
  // 			element: <EditProfile />,
  // 		},
  // 		{
  // 			path: "/DashBoard",
  // 			element: <DashBoard />,
  // 		},
  // 	],
  // },
  // {
  // 	element: <AnotherLayout />,
  // 	children: [
  // 		{
  // 			path: "/login",
  // 			element: <Login />,
  // 		},
  // 		{
  // 			path: "/temp",
  // 			element: <Temp />,
  // 		},
  // 	],
  // },
]);

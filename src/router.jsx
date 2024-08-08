import { Navigate, createBrowserRouter } from "react-router-dom";
import Home from "./Site/Pages/Home";
import NotFound from "./Site/Pages/NotFound";
import SiteLayout from "./components/SiteLayout";
import AdminLayout from "./components/AdminLayout";
import AdminLogin from "./Admin/Pages/Auth/AdminLogin";
import ProtectedRoute from "./Admin/Components/ProtectedRoute ";
import AllAdmins from "./Admin/Pages/Admin/AllAdmins";
import AllRoles from "./Admin/Pages/Role/AllRoles";
import AdminArchives from "./Admin/Pages/Admin/AdminArchives";
import AllUsers from "./Admin/Pages/User/AllUsers";
import Languages from "./Admin/Pages/Languages/Languages";
import AllCountries from "./Admin/Pages/Location/AllCountries";
import AllStates from "./Admin/Pages/Location/AllStates";
import AllCities from "./Admin/Pages/Location/AllCities";
import RolePermissions from "./Admin/Pages/Role/RolePermissions";
import UserArchives from "./Admin/Pages/User/UserArchives";
import AllCategories from "./Admin/Pages/Category_brand/AllCategories";
import AllBrand from "./Admin/Pages/Category_brand/AllBrand";
import AllAttributes from "./Admin/Pages/Attributes/AllAttributes";
import Privacy from "./Admin/Pages/Pages/Privacy";
import ContactSetting from "./Admin/Pages/Pages/ContactSetting";
import TermsConditions from "./Admin/Pages/Pages/TermsConditions";
import AdminProfile from "./Admin/Pages/Admin/AdminProfile";
import UserProfile from "./Admin/Pages/User/UserProfile";
import AllTags from "./Admin/Pages/Attributes/AllTags";
import AllProducts from "./Admin/Pages/Products/AllProducts";
import ArchivesProducts from "./Admin/Pages/Products/ArchivesProducts";
import AllOrder from "./Admin/Pages/Order_cart/AllOrder";
import HomePage from "./Admin/Pages/Pages/HomePage";
import Profile from "./Site/Pages/Profile/Profile";
import EditWord from "./Admin/Pages/Languages/EditWord";
import ViewProduct from "./Admin/Pages/Products/ViewProduct";
import AllProduct from "./Site/Pages/AllProduct";
import CardsPage from "./Site/Pages/CardsPage";
import ProductByCategory from "./Site/Pages/ProductByCategory";
import SiteViewProduct from "./Site/Pages/SiteViewProduct";
import Delivery from "./Admin/Pages/Order_cart/Delivery";
import AllTax from "./Admin/Pages/Order_cart/AllTax";
import ViewOrder from "./Site/Pages/Profile/ViewOrder";
import Index from "./Admin/Pages/home/Index";
import SocialMedia from "./Admin/Pages/Pages/SocialMedia";
import PaymentMethod from "./Admin/Pages/Payment/PaymentMethod";
import AllPayment from "./Admin/Pages/Payment/AllPayment";
import AdminViewOrder from "./Admin/Pages/User/component/AdminViewOrder";
import BrandsCategory from "./Admin/Pages/Category_brand/BrandsCategory";
import ProductByBrand from "./Site/Pages/ProductByBrand";
import SitePrivacy from "./Site/Pages/SitePrivacy";
import SiteTermsConditions from "./Site/Pages/SiteTermsConditions";
import Contact from "./Site/Pages/Contact/Contact";
import CompanyInfo from "./Admin/Pages/Company/CompanyInfo";
import LandPageImages from "./Admin/Pages/Pages/LandPageImages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        path: "/profile/:id/:username",
        element: <Profile />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/allProduct",
        element: <AllProduct />,
      },
      {
        path: "/cardPage",
        element: <CardsPage />,
      },
      {
        path: "/category/:id/",
        element: <ProductByCategory />,
      },
      {
        path: "/brand/:id/",
        element: <ProductByBrand />,
      },
      {
        path: "/siteviewproduct/:id/:name",
        element: <SiteViewProduct />,
      },
      {
        path: "/vieworder/:id/:checkout",
        element: <ViewOrder />,
      },
      {
        path: "/privacy",
        element: <SitePrivacy />,
      },
      {
        path: "/TermsConditions",
        element: <SiteTermsConditions />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/admin/",
        element: <Index />,
      },
      {
        path: "/admin/alladmins",
        element: <AllAdmins />,
      },
      {
        path: "/admin/adminarchives",
        element: <AdminArchives />,
      },
      {
        path: "/admin/personalProfile",
        element: <AdminProfile />,
      },
      {
        path: "/admin/adminProfile/:id/:name",
        element: <AdminProfile />,
      },
      {
        path: "/admin/allusers",
        element: <AllUsers />,
      },
      {
        path: "/admin/userarchives",
        element: <UserArchives />,
      },
      {
        path: "/admin/userProfile/:id/:name",
        element: <UserProfile />,
      },
      {
        path: "/admin/allroles",
        element: <AllRoles />,
      },
      {
        path: "/admin/rolepermission/:id",
        element: <RolePermissions />,
      },
      {
        path: "/admin/languages",
        element: <Languages />,
      },
      {
        path: "/admin/EditWord",
        element: <EditWord />,
      },
      {
        path: "/admin/allcountries",
        element: <AllCountries />,
      },
      {
        path: "/admin/allstates/:id/:country",
        element: <AllStates />,
      },
      {
        path: "/admin/allcities/:id/:country/:state_id/:state",
        element: <AllCities />,
      },
      {
        path: "/admin/allcategories",
        element: <AllCategories />,
      },
      {
        path: "/admin/allbrands",
        element: <AllBrand />,
      },
      {
        path: "/admin/brandsCategory",
        element: <BrandsCategory />,
      },
      {
        path: "/admin/allattributes",
        element: <AllAttributes />,
      },
      {
        path: "/admin/allTags/:id/:AttName",
        element: <AllTags />,
      },
      {
        path: "/admin/allproducts",
        element: <AllProducts />,
      },
      {
        path: "/admin/viewproduct/:id/:name",
        element: <ViewProduct />,
      },
      {
        path: "/admin/archiveproducts",
        element: <ArchivesProducts />,
      },
      {
        path: "/admin/allorder",
        element: <AllOrder />,
      },
      {
        path: "/admin/HomePageSetting",
        element: <HomePage />,
      },
      {
        path: "/admin/privacy",
        element: <Privacy />,
      },
      {
        path: "/admin/contactsetting",
        element: <ContactSetting />,
      },
      {
        path: "/admin/termsconditions",
        element: <TermsConditions />,
      },
      {
        path: "/admin/LandPageImages",
        element: <LandPageImages />,
      },
      {
        path: "/admin/socialmedia",
        element: <SocialMedia />,
      },
      {
        path: "/admin/companyInfo",
        element: <CompanyInfo />,
      },
      {
        path: "/admin/delivery",
        element: <Delivery />,
      },
      {
        path: "/admin/tax",
        element: <AllTax />,
      },
      {
        path: "/admin/paymentmethod",
        element: <PaymentMethod />,
      },
      {
        path: "/admin/allpayment",
        element: <AllPayment />,
      },
      {
        path: "/admin/vieworder/:id/:username/:orderid",
        element: <AdminViewOrder />,
      },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

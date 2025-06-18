import HomePage from "../../components/HomePage";
import LoginPage from "../../components/LoginPage";
import Layout from "../../components/layout/Layout";
import AuthGuard from "../../components/guards/AuthGuard";
import ProfilePage from "../../components/ProfilePage";
import ProductDetail from "../../components/ProductDetail";

// Public routes accessible to all users
export const PUBLIC_ROUTES = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/product/:id",
    element: (
      <Layout>
        <ProductDetail />
      </Layout>
    ),
  },
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <Layout>
          <ProfilePage />
        </Layout>
      </AuthGuard>
    ),
  }
];

// Combined routes for the router
export const ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];

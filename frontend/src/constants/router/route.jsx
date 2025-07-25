import HomePage from "../../components/HomePage";
import LoginPage from "../../components/LoginPage";
import Layout from "../../components/layout/Layout";
import AuthGuard from "../../components/guards/AuthGuard";
import ProfilePage from "../../components/ProfilePage";
import ProductDetail from "../../components/ProductDetail";
import ShopPage from "../../components/ShopPage";
import FavoritesPage from "../../components/FavoritesPage";
import CartPage from "../../components/CartPage";
import ContactPage from "../../components/ContactPage";
import CheckoutPage from "../../components/CheckoutPage";
import OrderConfirmationPage from "../../components/OrderConfirmationPage";
import OrdersListPage from "../../components/OrdersListPage";

// Public routes accessible to all users
export const PUBLIC_ROUTES = [
  {
    path: "/login",
    element: <LoginPage />,
  },
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
    path: "/shop",
    element: (
      <Layout>
        <ShopPage />
      </Layout>
    ),
  },
  {
    path: "/contact",
    element: (
      <Layout>
        <ContactPage />
      </Layout>
    ),
  },
];

// Protected routes that require authentication
export const PROTECTED_ROUTES = [
  {
    path: "/profile",
    element: (
      <AuthGuard>
        <Layout>
          <ProfilePage />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/favorites",
    element: (
      <AuthGuard>
        <Layout>
          <FavoritesPage />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/cart",
    element: (
      <AuthGuard>
        <Layout>
          <CartPage />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/checkout",
    element: (
      <AuthGuard>
        <Layout>
          <CheckoutPage />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/order-confirmation/:orderId",
    element: (
      <AuthGuard>
        <Layout>
          <OrderConfirmationPage />
        </Layout>
      </AuthGuard>
    ),
  },
  {
    path: "/orders",
    element: (
      <AuthGuard>
        <Layout>
          <OrdersListPage />
        </Layout>
      </AuthGuard>
    ),
  },
];

// Combined routes for the router
export const ROUTES = [...PUBLIC_ROUTES, ...PROTECTED_ROUTES];

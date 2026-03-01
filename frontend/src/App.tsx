import { createRouter, RouterProvider, createRoute, createRootRoute } from '@tanstack/react-router';
import HomePage from './pages/HomePage';
import AdminDashboard from './pages/AdminDashboard';
import Layout from './components/Layout';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminDashboard,
});

const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

const router = createRouter({ routeTree });

export default function App() {
  return <RouterProvider router={router} />;
}

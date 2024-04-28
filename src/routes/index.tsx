import { Suspense } from 'react';
import { Navigate, Outlet, useRoutes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Library for decoding JWT
import NotFound from '@/pages/not-found';
import DashboardLayout from '@/components/layout/dashboard-layout';
import SignInPage from '@/pages/auth/signin';
import DashboardPage from '@/pages/dashboard';
import StudentPage from '@/pages/students';
import StudentDetailPage from '@/pages/students/StudentDetailPage';
import InpersuNate from '@/pages/inPersunate';
import RoomPage from '@/pages/room';
import UserPage from '@/pages/user';

// Simulated authentication check
const isAuthenticated = () => {
  const token: string | null = localStorage.getItem('accessToken');
  if (token) {
    const decodedToken: any = jwtDecode(token);
    const currentTime: number = Date.now() / 1000;
    console.log(
      decodedToken.exp > currentTime,
      'decodedToken.exp > currentTime'
    );
    return decodedToken.exp > currentTime;
  }
  return false;
};

// Protected route component
const ProtectedRoute = ({ element, ...rest }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

export default function AppRouter() {
  const dashboardRoutes = [
    {
      path: '/',
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: <ProtectedRoute element={<DashboardPage />} />,
          index: true
        },
        {
          path: 'pg',
          element: <ProtectedRoute element={<StudentPage />} />
        },
        {
          path: 'room',
          element: <ProtectedRoute element={<RoomPage />} />
        },
        {
          path: 'User',
          element: <ProtectedRoute element={<UserPage />} />
        },
        {
          path: 'student/details',
          element: <ProtectedRoute element={<StudentDetailPage />} />
        }
      ]
    }
  ];

  const publicRoutes = [
    {
      path: '/login',
      element: isAuthenticated() ? <Navigate to="/" replace /> : <SignInPage />,
      index: true
    },
    {
      path: '/404',
      element: <NotFound />
    },
    {
      path: '/inp',
      element: <InpersuNate />,
      children: [
        {
          path: ':id',
          element: <InpersuNate />
        }
      ]
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />
    }
  ];

  const routes = useRoutes([...dashboardRoutes, ...publicRoutes]);

  return routes;
}

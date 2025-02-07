import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Layout } from '@/components/layout';
import { Home } from '@/pages/home';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
]);

export const Router = () => {
  return <RouterProvider router={routes} />;
};

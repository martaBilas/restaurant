import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/Layout.jsx'
import Home from '../Pages/Home.jsx';
import Info from '../Pages/Info.jsx';

export const SuperAdminRouter = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path:'/contactInfo',
        element: <Info/>
      }
    ],
  },
])


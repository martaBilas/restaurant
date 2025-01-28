import { createBrowserRouter } from 'react-router-dom'
import Layout from '../Layout/UserLayout/Layout.jsx';

import Home from '../Pages/Home.jsx';
import Info from '../Pages/Info.jsx';

const UserRouter = createBrowserRouter([
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

export default UserRouter;

import { createBrowserRouter } from 'react-router-dom'
import Home from '../Pages/Home.jsx';
import { Orders } from '../Pages/SuperAdmin/Orders/Orders.jsx';
import OrderDetails from '../Pages/SuperAdmin/OrderDetails/OrderDetails.jsx';
import { SuperAdminLayout } from '../Layout/SuperAdminLayout/SuperAdminLayout.jsx';

export const SuperAdminRouter = createBrowserRouter([
  {
    path: '/',
    element: <SuperAdminLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path:'/orders',
        element: <Orders/>
      },
      {
        path: '/order-details/:orderId',
        element: <OrderDetails/>
      }
    ],
  },
])


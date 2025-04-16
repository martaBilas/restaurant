import { createBrowserRouter } from 'react-router-dom'
import ManageMenu from '../Pages/SuperAdmin/ManageMenu/ManageMenu.jsx';
import { Orders } from '../Pages/SuperAdmin/Orders/Orders.jsx';
import OrderDetails from '../Pages/SuperAdmin/OrderDetails/OrderDetails.jsx';
import MealWizard from '../Pages/SuperAdmin/MealWizard/MealWizard.jsx';
import CategoryWizard from '../Pages/SuperAdmin/CategoryWizard/CategoryWizard.jsx';
import { SuperAdminLayout } from '../Layout/SuperAdminLayout/SuperAdminLayout.jsx';
import { AnalyticsDashboard } from '../Pages/SuperAdmin/AnalyticsDashboard/AnalyticsDashboard.jsx';

export const SuperAdminRouter = createBrowserRouter([
  {
    path: '/',
    element: <SuperAdminLayout />,
    children: [
      {
        path: '/',
        element: <ManageMenu />,
      },
      {
        path:'/orders',
        element: <Orders/>
      },
      {
        path: '/order-details/:orderId',
        element: <OrderDetails/>
      },
      {
        path: '/meal/:id',
        element: <MealWizard/>
      },
      {
        path: '/meal/new',
        element: <MealWizard/>
      },
      {
        path: '/category/:id',
        element: <CategoryWizard/>
      },
      {
        path: '/category/new',
        element: <CategoryWizard/>
      },
      {
        path: '/analytics',
        element: <AnalyticsDashboard/>
      }
    ],
  },
])


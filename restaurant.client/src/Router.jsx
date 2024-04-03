import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import LogIn from './User/Pages/LogIn.jsx';
import SignUp from "./User/Pages/SingUp.jsx";
import Home from './Pages/Home.jsx';
import Cart from './Pages/Cart.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/LogIn',
        element: <LogIn />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
      {
        path: '/cart',
        element: <Cart/>
      }
    ],
  },
])

export default Router;

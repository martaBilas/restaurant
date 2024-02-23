import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout.jsx'
import SignIn from './User/Pages/SignIn.jsx';
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
        path: '/signIn',
        element: <SignIn />,
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

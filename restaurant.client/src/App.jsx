import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'

import Routers from './routes/Routers.jsx';
import Layout from './Layout/Layout';
import SignIn from './User/Pages/SignIn.jsx';
import SignUp from "./User/Pages/SingUp.jsx";
import MealCatalog from "./MealCatalog/Pages/MealCatalog.jsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <MealCatalog />,
      },
      {
        path: '/signIn',
        element: <SignIn />,
      },
      {
        path: '/signUp',
        element: <SignUp />,
      },
    ],
  },
])

 const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
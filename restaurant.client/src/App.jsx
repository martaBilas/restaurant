import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router'

import Layout from './Layout/Layout';
import SignIn from './User/Pages/SignIn.jsx';
import SignUp from "./User/Pages/SingUp.jsx";
import Home from './Meal/Pages/Home.jsx';
import FileUpload from './ImportMeals/FileUpload.jsx';

const router = createBrowserRouter([
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
        path: '/uploadMeals',
        element: <FileUpload/>
      }
    ],
  },
])

 const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
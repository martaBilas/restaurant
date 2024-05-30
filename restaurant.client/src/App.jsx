import "./App.css";
import { RouterProvider } from "react-router";
import Router from "./Router";
import { AuthProvider } from "./User/AuthContext";

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={Router} />
    </AuthProvider>
  );
};

export default App;

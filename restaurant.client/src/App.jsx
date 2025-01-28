import "./App.css";
import { RouterProvider } from "react-router";
import UserRouter from "./Routes/UserRouter";
import { AuthProvider } from "./state/Auth/AuthContext";
import 'devextreme/dist/css/dx.material.lime.light.css';

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={UserRouter} />
    </AuthProvider>
  );
};

export default App;

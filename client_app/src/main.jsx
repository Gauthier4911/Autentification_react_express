import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from "./ErrorPage.jsx";
import Home from "./pages/Home.jsx";
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx'; 
import PrivateRoute from './components/PrivateRoute.jsx'; 

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: (
                    <PrivateRoute>
                        <Home />
                    </PrivateRoute>
                ),
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router} />
  </StrictMode>,
);
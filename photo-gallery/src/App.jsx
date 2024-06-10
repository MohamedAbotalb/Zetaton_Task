import React from "react";
import {
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { SharedLayout } from "./layouts/SharedLayout";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Favorites } from "./pages/Favorites";
import { NotFound } from "./pages/NotFound";
import { UserProvider, useUser } from "./contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const RequireAuth = ({ children }) => {
    const { user } = useUser();

    return user ? children : <Navigate to="/signin" />;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route
            path="favorites"
            element={
              <RequireAuth>
                <Favorites />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </UserProvider>
  );
};

export default App;

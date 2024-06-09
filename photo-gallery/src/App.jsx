import React from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { SharedLayout } from "./layouts/SharedLayout";

import { Home } from "./pages/Home";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { Favorites } from "./pages/Favorites";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>
        <Route path="signup" element={<SignUp />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="*" />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;

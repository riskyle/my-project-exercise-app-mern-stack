import {
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";

//pages
import Home from "../pages/Home";
import RootLayout from "../components/layout/RootLayout";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import { useAuthContext } from "../hooks/useAuthContext";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<RootLayout />}>
//       <Route index element={<Home />} />
//       <Route path="login" element={<Login />} />
//       <Route path="signup" element={<SignUp />} />
//     </Route>
//   )
// );

// const Routes = () => {
//   return <RouterProvider router={router} />;
// };

const Rawter = () => {
  const { user } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={user ? <Home /> : <Navigate to="login" />} />
        <Route path="login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route
          path="signup"
          element={!user ? <SignUp /> : <Navigate to="/" />}
        />
      </Route>
    </Routes>
  );
};

export default Rawter;

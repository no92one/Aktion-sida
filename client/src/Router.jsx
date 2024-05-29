import { createBrowserRouter, useRouteError } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Layout from "./Layout.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import RequireAuth from "./RequireAuth.jsx";
import ProfileLayout from "./ProfileLayout.jsx";
import Orders from "./pages/Profile/Orders.jsx";
import SellProduct from "./pages/SellProduct.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Watching from "./pages/Profile/Watching.jsx";

function ErrorBoundary() {
  const error = useRouteError();
  console.log(error);
  return <div>{error.message}</div>;
}

export default function Router() {
  return createBrowserRouter([
    {
      element: <Layout />,
      errorElement: <ErrorBoundary />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/login", element: <Login /> },
        { path: "/signup", element: <SignUp /> },
        {
          path: "/product/:id", element: <ProductPage />,
          loader: async ({ params }) => {
            return fetch(`/api/products/${params.id}`)
          }
        },
        { path: "/auctionProduct", element: <RequireAuth> <SellProduct /> </RequireAuth> },
        {
          path: "/profile",
          element: <RequireAuth> <ProfileLayout /> </RequireAuth>,
          children: [
            { index: true, element: <Profile /> },
            { path: "orders", element: <Orders /> },
            { path: "watching", element: <Watching /> }
          ],
        }
      ],
    }
  ])
}

// export default function Router() {
//   return createBrowserRouter(
//     createRoutesFromElements(
//       <Route path="/" element={<Layout />}>
//         <Route index element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/product/:productId"
//           element={<ProductPage />}
//           loader={async ({ params }) => {
//             const response = await fetch(`api/products/?id=${params.productId}`)
//             return await response.json();
//           }}
//         />
//         <Route path="/SellProduct" element={<RequireAuth> <SellProduct /> </RequireAuth>} />
//         <Route path="/profile" element={
//           <RequireAuth> <ProfileLayout /> </RequireAuth>
//         }>
//           <Route index element={<Profile />} />
//           <Route path="orders" element={<Orders />} />
//         </Route>
//       </Route>
//     )
//   )
// }
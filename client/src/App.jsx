import { RouterProvider } from "react-router-dom";
import { GlobalProvider } from "./contexts/Globalcontext.jsx";
import Router from "./Router.jsx";

export default function App() {

  return <>
    <GlobalProvider>
      <RouterProvider router={Router()} />
    </GlobalProvider>
  </>
}

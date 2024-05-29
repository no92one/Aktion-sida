import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";

export default function Layout() {
  const navigation = useNavigation()
  const isLoading = navigation.state === "loading"

  return <>
    <header className="w-full bg-white text-black text-xl shadow-md">
      <Navbar />
    </header>
    {isLoading ? <h1 className="animate-pulse">Laddar...</h1> : null}

    <main className="min-h-[70vh] flex flex-col px-5">
      <Outlet />
    </main>

    <footer className="flex justify-center bg-black w-full grow min-h-20 text-white text-xl" >
      <h1 className="pt-1">Kontakt info kommer snart...</h1>
    </footer>
  </>
}

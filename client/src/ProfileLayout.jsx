import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { GlobalContext } from "./contexts/Globalcontext.jsx";
import ProfileMenu from "./components/ProfileMenu.jsx";

export default function ProfileLayout() {
  const { user } = useContext(GlobalContext)
  return <>
    <h1 className="bg-blue-900 py-5 text-white text-center m-0">{user.username}</h1>
    <div className="flex grow">
      <ProfileMenu />
      <section className="grow">
        <Outlet />
      </section>
    </div>
  </>
}

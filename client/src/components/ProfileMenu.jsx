import { Link } from "react-router-dom";

export default function ProfileMenu() {
  return <>
    <aside className="w-1/6 ">
      <h2 className="mt-1">Min kundprofil</h2>
      <nav className="flex flex-col items-center gap-2 my-2">
        <Link className="bg-gray-400 w-full rounded text-center p-1 hover:bg-gray-300" to="/profile">Min profil</Link>
        <Link className="bg-gray-400 w-full rounded text-center p-1 hover:bg-gray-300" to="/profile/orders">Mina bud</Link>
        <Link className="bg-gray-400 w-full rounded text-center p-1 hover:bg-gray-300" to="/profile/watching">Följer</Link>
      </nav>
    </aside>
  </>
}

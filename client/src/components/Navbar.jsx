import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from '/Logo.svg'
import { GlobalContext } from "../contexts/Globalcontext.jsx"
import logout from "../services/login/logout.jsx"

export default function Navbar() {
  const navigate = useNavigate()
  const { user, setUser } = useContext(GlobalContext)

  async function tryStripe() {
    const response = await fetch("/api/payment/create-checkout-session", {
      method: "post",
      headers: { "Content-Type": "application/json" }
    })
    let result = await response.json()
    if (response.status === 200) {
      location.href = result.url
    }
  }

  async function logoutUser() {
    const { response } = await logout()

    if (response.status === 200) {
      alert(response.message)
      setUser(null)
      navigate("/")
    } else {
      alert(response.message)
    }
  }

  return <>
    <nav className="flex justify-between p-5">
      <Link to={"/"}>
        <img src={Logo} className="w-24 rounded-md" alt="Logo" />
      </Link>

      <div className="flex justify-center gap-10">
        <Link>Senaste</Link>
        <Link>Kategorier</Link>
        <Link>- 24/h</Link>
        {user ? <Link to="auctionProduct">Sälj något</Link> : null}
      </div>

      {user ?
        <>
          <section className="flex flex-col justify-center items-center gap-1">
            <Link to="/profile">{user.username}</Link>
            <button className="text-base text-center transition-colors ease-in-out hover:text-blue-200" onClick={logoutUser}>Logga ut</button>
          </section>
        </>
        :
        <Link to={"/login"} className="min-w-32 p-3 text-center rounded-lg transition ease-in-out duration-100 hover:scale-110 hover:shadow-custom hover:cursor-pointer active:bg-blue-900 active:text-white">Logga in</Link>
      }
      {/* <button onClick={tryStripe}>Try Stripe</button> */}
    </nav>
  </>
} 
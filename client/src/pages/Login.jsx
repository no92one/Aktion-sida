import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../contexts/Globalcontext.jsx";
import login from "../services/login/login.jsx";

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(GlobalContext)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)

  async function submitForm(e) {
    e.preventDefault()

    const { response, result } = await login(username, password)

    if (response.status === 201) {
      console.log(result);
      setUser(result.user)
      navigate("/")
    } else {
      alert(result.message);
    }
  }

  return <>
    <h1 className="text-center">Logga in</h1>

    <section className="bg-blue-900 shadow-custom rounded-2xl p-32 self-center mt-4 mb-16">
      <form onSubmit={submitForm} className="flex flex-col gap-5 items-center">
        <input className="p-2" type="text" onChange={(event) => setUsername(event.target.value)} placeholder="Användarnamn" autoComplete="first-name" />
        <input className="p-2" type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Lösenord" autoComplete="current-password" />
        <button className="bg-white w-32 p-2 rounded-xl font-semibold shadow-custom transition-colors ease-in-out hover:bg-blue-200 " >Logga in</button>
        <Link className="text-white transition-colors ease-in-out hover:text-blue-200" to="/signup" >Skapa konto</Link>
      </form>
    </section>
  </>
}

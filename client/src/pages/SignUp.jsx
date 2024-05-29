import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import checkUsername from "../services/users/checkUsername.jsx";
import createUser from "../services/users/createUser.jsx";

export default function SignUp() {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [validPassword, setValidPassword] = useState(false)
  const navigate = useNavigate();

  async function submitForm(e) {
    e.preventDefault()

    const usernameAvailable = await checkUsername(username)

    if (!usernameAvailable) {
      alert("Användarnamnet redan upptaget.")
    } else if (password.length < 5) {
      alert("Lösenordet måste bestå av minst 5 karaktärer.")
    } else {
      const { response, result } = await createUser(username, password)

      if (response.status === 201) {
        alert(`${username} - har skapats.`)
        navigate("/login")
      } else {
        alert(result.message)
      }
    }
  }


  useEffect(() => {

    if (username.length >= 3) {
      const usernameController = async () => {
        const ok = await checkUsername(username)
        setValidUsername(ok)
      }

      usernameController()
    } else {
      setValidUsername(false)
    }
  }, [username])

  useEffect(() => {

    if (password.length >= 5) {
      setValidPassword(true)
    } else {
      setValidPassword(false)
    }
  }, [password])

  return <>
    <h1 className="text-center">Skapa konto</h1>

    <section className="bg-blue-900 shadow-custom rounded-2xl p-32 self-center mt-4 mb-16">
      <form onSubmit={submitForm} className="flex flex-col gap-5 items-center">
        <input className={`p-2 ${validUsername ? "bg-green-200" : "bg-red-200"}`} type="text" onChange={(event) => setUsername(event.target.value)} placeholder="Användarnamn" required />
        <input className={`p-2 ${validPassword ? "bg-green-200" : "bg-red-200"}`} type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Lösenord" required />
        <button className="bg-white w-32 p-2 rounded-xl font-semibold shadow-custom transition-colors ease-in-out hover:bg-blue-200" >Skapa</button>
      </form>
    </section>
  </>
}

import { useContext } from "react"
import { GlobalContext } from "../../contexts/Globalcontext.jsx"

export default function Profile() {
  const { user } = useContext(GlobalContext)
  const { username } = user
  return <>
    <p>{username}</p>
  </>
}

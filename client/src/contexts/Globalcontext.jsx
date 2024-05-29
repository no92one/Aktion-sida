import { createContext, useEffect, useState } from "react";
import getLogin from "../services/login/getLogin";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const checkLogin = async () => {
      const { response, result } = await getLogin()

      if (response.status === 200) {
        setUser(result)
      }
    }

    checkLogin()
  }, [])

  return <GlobalContext.Provider
    value={{
      user,
      setUser
    }}>
    {children}
  </GlobalContext.Provider>

}

export { GlobalContext, GlobalProvider }
import axios from "axios"
import React, { createContext, useEffect, useState } from "react"

export const UserContext = createContext({})
const UserContextProvider = ({ children }) => {
  useEffect(() => {
    if (!user) {
      axios.get("/profile",{

      })
    }
  }, [])
  const [user, setUser] = useState(null)
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}

export default UserContextProvider

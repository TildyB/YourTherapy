import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const UserContext = createContext()

export const UserProvider = ({children}) => {
  const [ user, setUser ] = useState(null)
  const [ teams, setTeams ] = useState(null)
  const [clientsub,setClientsub] = useState(null)
  
  const checkLogin = () =>{
    if (localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      setClientsub(localStorage.getItem("clientSub"))
      return true
    }else{
      return false
    }
  }
  const [ isLoggedIn,setIsLoggedIn ] = useState(checkLogin)

  
  const login = (user, token) => {
    setUser(user)
    setIsLoggedIn(true)
    localStorage.setItem("token", token)
    localStorage.setItem("user",JSON.stringify(user))
  }
  
  const logout = () => {
    setUser(null)
    setIsLoggedIn(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

/*   useEffect(()=> {
    if (localStorage.getItem("token")) {
      setUser(JSON.parse(localStorage.getItem("user")))
      setIsLoggedIn(true)
    }
  }, []) */
  

 
  return (
    <UserContext.Provider value={{user, login, logout, isLoggedIn,clientsub,setClientsub }}>
      {children}
    </UserContext.Provider>
    )
}

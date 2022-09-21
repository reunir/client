import React, { useCallback } from 'react'
import { useLocalStorage } from '../hooks'


export const AuthContext = React.createContext({})
AuthContext.displayName = 'AuthContext'

function AuthProvider(props) {
    const [userData, setUserData] = useLocalStorage('conferio-user', null)
  
    const isAllowedToRole = useCallback(
      (roles) => {
        return roles.includes(userData?.role.name)
      },
      [userData],
    )
  
    const logout = useCallback(() => {
      setUserData(null)
    }, [setUserData])
  
    return <AuthContext.Provider value={{ logout, user: userData, setUser: setUserData, isAllowedToRole }} {...props} />
  }

  function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
      throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context
  }
  
  export { AuthProvider, useAuth }
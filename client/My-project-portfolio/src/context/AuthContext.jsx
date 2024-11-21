import React, { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({children}) {
    const [loginToken, setLoginToken] = useState("Testing")
  return (
    <AuthContext.Provider value={{loginToken, setLoginToken}}>
        {children}
    </AuthContext.Provider>
  )
}

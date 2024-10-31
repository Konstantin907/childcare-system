import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const login = () => {
        setIsLoggedIn(true);
    };


    const logout = () => {
        setIsLoggedIn(false)
    }


    return (
        <UserContext.Provider value={{login, logout, isLoggedIn }}>
            {children}
        </UserContext.Provider>
    )
};


export const useUser = () => useContext(UserContext);
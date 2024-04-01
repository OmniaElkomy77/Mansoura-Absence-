import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect, createContext } from "react";
export const AppContext = createContext()
const AppContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({})
    const [login, setLogin] = useState(false)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        let uData = await AsyncStorage.getItem("account")
        if (uData != null || uData != undefined) {
            setLogin(true)
            setUserData(JSON.parse(uData))
        }
    }

    const setUser = async (data) => {
        setUserData(data)
        await AsyncStorage.setItem("account", JSON.stringify(data))
        setLogin(true)
    }
    const removeUser = async () => {
        setUserData({})
        await AsyncStorage.removeItem("account")
        setLogin(false)
    }
    return (
        <AppContext.Provider value={{ userData, login, setUser, removeUser }} >
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
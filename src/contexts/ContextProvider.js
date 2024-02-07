import React, { createContext, useContext, useState } from "react";

const stateContext = createContext();

const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}

export const  ContextProvider = ({ children }) => {

    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#8840E6');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [selectedPropertyData, setSelectedPropertyData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false)
    }

    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false)
    }


    const handleClick = (clicked) => {
        setIsClicked({
            ...initialState, [clicked] : true
        })
    }


    return (
        <stateContext.Provider
            value={{ 
                activeMenu, 
                setActiveMenu,
                isClicked,
                setIsClicked,
                handleClick,
                screenSize,
                setScreenSize,
                currentColor,
                setColor,
                currentMode, 
                setMode,
                themeSettings, 
                setThemeSettings,
                selectedPropertyData, 
                setSelectedPropertyData,
                currentPage, 
                setCurrentPage,
            }}
        >
            { children }
        </stateContext.Provider>
    )
}

export const useStateContext = () => useContext(stateContext)
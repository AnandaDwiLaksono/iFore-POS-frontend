import { createContext, useContext, useState } from "react";

const StateContext = createContext();

const initialState ={
    chat: false,
    cart: false,
    userProfile: false,
    notification: false
};

export const ContextProvider = ({ children }) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(false);
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const [themeSettings, setThemeSettings] = useState(false);
    const [addOrderList, setAddOrderList] = useState(false);
    const [itemData, setItemData] = useState(null);
    const [icon, setIcon] = useState(true);
    const orderId = [];
    const [onOrder, setOnOrder] = useState(false);

    const handleClick = (clicked) => {
        setIsClicked({ ...initialState, [clicked]: true });
    };

    const setMode = (e) => {
        setCurrentMode(e.target.value);
    
        localStorage.setItem('themeMode', e.target.value);
    
        setThemeSettings(false);
    };
    
    const setColor = (color) => {
        setCurrentColor(color);
    
        localStorage.setItem('colorMode', color);
    
        setThemeSettings(false);
    };

    const currencyFormat = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    });

    const numberFormat = new Intl.NumberFormat('id-ID');

    return (
        <StateContext.Provider value={{
            activeMenu,
            setActiveMenu,
            isClicked,
            setIsClicked,
            screenSize,
            setScreenSize,
            handleClick,
            setColor,
            setMode,
            currentMode,
            setCurrentMode,
            currentColor,
            setCurrentColor,
            themeSettings,
            setThemeSettings,
            addOrderList,
            setAddOrderList,
            itemData,
            setItemData,
            currencyFormat,
            icon,
            setIcon,
            numberFormat,
            orderId,
            setOnOrder,
            onOrder,
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);

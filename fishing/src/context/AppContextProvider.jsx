import React, {useCallback, useContext, useEffect, useState} from 'react';
import fishs from "../../fishs.js";

const Context = React.createContext(null);

export function useAppContext() {
    const context = React.useContext(Context);
    if (!context) throw new Error('Use app context within provider!');
    return context;
}

const AppContextProvider = ({children, ...props}) => {
    const context = useCreateAppContext(props)
    return (
        <Context.Provider value={context}>
            {children}
        </Context.Provider>
    );
};
export const useCreateAppContext = function(props) {
    const [price, setPrice] = useState(props.price || 0)
    const [sadok, setSadok] = useState(props.sadok || [])
    const [fish, setFish] = useState(fishs )

    const seterSadok = useCallback((n) => {
        setSadok([...sadok, n])
    })
    const seterAllSadok = useCallback((n) => {
        setSadok(n)
    })
    const delElSadok = (id) => {
        setSadok([...sadok.filter(el => el.id !== id)])
    }
    const seterPrice = useCallback((n) => {
        setPrice(n)
    })
    const clearCash = useCallback(() => {
        localStorage.clear()
    })
    return {
        price,
        sadok,
        fish,
        seterSadok,
        delElSadok,
        seterPrice,
        clearCash,
        seterAllSadok
    };
}
export default AppContextProvider;
import { useState, createContext, useContext } from 'react';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    let [user, setUser] = useState(null);

    const setLoggedUser = (user) => {
        setUser(user);
    };
    
    return (
        <AuthContext.Provider value={{ user, setLoggedUser }}>
          {children}
        </AuthContext.Provider>
    );
};

export const useUser = () => {
    let context = useContext(AuthContext);
    if(!context){
        throw new Error("useUser must be used inside AuthContextProvider!");
    }
    return context;
}
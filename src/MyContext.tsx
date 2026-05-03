import React, { createContext, useContext, useState, ReactNode } from 'react';
import validateAadhaarSyntax from './functions/validateAadhaarSyntax';
import getAadharQRData from './functions/getAadharQRData';
interface LibContextType {
    user: string;
    login: (name: string) => void;
    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => {};
}

const LibContext = createContext<LibContextType | undefined>(undefined);

export const ReactIndiaSuiteProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<string>("Guest");

    const login = (name: string) => setUser(name);




    return (
        <LibContext.Provider value={{ user, login, validateAadhaarSyntax, getAadharQRData }}>
            {children}
        </LibContext.Provider>
    );
};

export const useReactIndiaSuite = () => {
    const context = useContext(LibContext);
    if (!context) throw new Error("useReactIndiaSuite must be used within ReactIndiaSuiteProvider");
    return context;
};
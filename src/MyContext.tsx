import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import validateAadhaarSyntax from './functions/validateAadhaarSyntax';
import getAadharQRData from './functions/getAadharQRData';
import getBranchFromIFSC, { BankDetails } from './functions/getBranchFromIFSC';
import checkPanDetails from './functions/validatePAN';
import { generateUPILink, launchUPI, UPIConfig, UPIApp } from './functions/upi';

interface LibContextType {

    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => Promise<{}>;
    getBranchFromIFSC: (ifscCode: string) => Promise<BankDetails | null>;
    checkPanDetails: (pan: string) => { panNumber: string | null, isValid: boolean, panType: string };
    upi: {
        generateLink: (config: UPIConfig) => string;
        launch: (config: UPIConfig, app?: UPIApp) => string | void;
        isMobile: boolean;
    };
}

const LibContext = createContext<LibContextType | undefined>(undefined);

export const ReactIndiaSuiteProvider = ({ children }: { children: ReactNode }) => {



    const isMobile = useMemo(() =>
        typeof window !== 'undefined' && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent),
        []);
    const value = useMemo(() => ({
        validateAadhaarSyntax,
        getAadharQRData,
        getBranchFromIFSC,
        checkPanDetails,
        upi: {
            generateLink: generateUPILink,
            launch: launchUPI,
            isMobile
        }
    }), [isMobile]);
    return (
        <LibContext.Provider
            value={value}>
            {children}
        </LibContext.Provider>
    );
};

export const useReactIndiaSuite = () => {
    const context = useContext(LibContext);
    if (!context) throw new Error("useReactIndiaSuite must be used within ReactIndiaSuiteProvider");
    return context;
};
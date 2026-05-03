import React, { createContext, useContext, useState, ReactNode, useMemo } from 'react';
import validateAadhaarSyntax from './functions/validateAadhaarSyntax';
import getAadharQRData from './functions/getAadharQRData';
import getBranchFromIFSC, { BankDetails } from './functions/getBranchFromIFSC';
import checkPanDetails from './functions/validatePAN';
import searchPostalCode from './functions/searchPostalCode';
import { generateUPILink, launchUPI, UPIConfig, UPIApp } from './functions/upi';
import formatIndianCurrency from './functions/formatIndianCurrency';
import { INDIA_STATES, findState, findDistrict, IndiaState } from './functions/IndianStates';
import numberToIndianWords from './functions/numberToIndianWords';
interface LibContextType {

    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => Promise<{}>;
    getBranchFromIFSC: (ifscCode: string) => Promise<BankDetails | null>;
    checkPanDetails: (pan: string) => { panNumber: string | null, isValid: boolean, panType: string };
    searchPostalCode: (postalCode: string) => Promise<{ message: string, posts: any[], status: string } | {}>;
    upi: {
        generateLink: (config: UPIConfig) => string;
        launch: (config: UPIConfig, app?: UPIApp) => string | void;
        isMobile: boolean;
    };
    formatIndianCurrency: (amount: number, symbol?: string) => string;
    indiaStates: {
        states: typeof INDIA_STATES;
        findState: (query: string) => IndiaState | undefined;
        findDistrict: (stateName: string) => string[];
    };
    numberToIndianWords: (num: number) => string;
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
        searchPostalCode,
        upi: {
            generateLink: generateUPILink,
            launch: launchUPI,
            isMobile
        },
        formatIndianCurrency,
        indiaStates: {
            states: INDIA_STATES,
            findState,
            findDistrict
        },
        numberToIndianWords
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
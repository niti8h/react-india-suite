import { ReactNode } from '../node_modules/react';
import { BankDetails } from './functions/getBranchFromIFSC';
import { UPIConfig, UPIApp } from './functions/upi';
import { INDIA_STATES, IndiaState } from './functions/IndianStates';

interface LibContextType {
    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => Promise<{}>;
    getBranchFromIFSC: (ifscCode: string) => Promise<BankDetails | null>;
    checkPanDetails: (pan: string) => {
        panNumber: string | null;
        isValid: boolean;
        panType: string;
    };
    searchPostalCode: (postalCode: string) => Promise<{
        message: string;
        posts: any[];
        status: string;
    } | {}>;
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
export declare const ReactIndiaSuiteProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useReactIndiaSuite: () => LibContextType;
export {};

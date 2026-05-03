import { ReactNode } from '../node_modules/react';
import { UPIConfig, UPIApp } from './functions/upi';

interface LibContextType {
    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => Promise<{}>;
    getBranchFromIFSC: (ifscCode: string) => Promise<{}>;
    checkPanDetails: (pan: string) => {
        panNumber: string | null;
        isValid: boolean;
        panType: string;
    };
    upi: {
        generateLink: (config: UPIConfig) => string;
        launch: (config: UPIConfig, app?: UPIApp) => string | void;
        isMobile: boolean;
    };
}
export declare const ReactIndiaSuiteProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useReactIndiaSuite: () => LibContextType;
export {};

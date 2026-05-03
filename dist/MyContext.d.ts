import { ReactNode } from 'react';

interface LibContextType {
    user: string;
    login: (name: string) => void;
    validateAadhaarSyntax: (aadhaar: string) => boolean;
    getAadharQRData: (hash: string) => {};
}
export declare const ReactIndiaSuiteProvider: ({ children }: {
    children: ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useReactIndiaSuite: () => LibContextType;
export {};

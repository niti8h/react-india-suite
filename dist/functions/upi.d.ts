/**
 * upiIntent.ts
 * Core logic for generating and launching UPI deep links.
 */
export interface UPIConfig {
    pa: string;
    pn: string;
    am?: string;
    tr?: string;
    tn?: string;
    mc?: string;
    cu?: string;
}
export type UPIApp = 'google-pay' | 'phonepe' | 'paytm' | 'bhim' | 'any';
/**
 * Generates a standardized upi://pay URI according to NPCI specifications.
 */
export declare const generateUPILink: (config: UPIConfig) => string;
/**
 * Launches the UPI app based on platform (iOS/Android/Generic).
 * Uses Android Intent syntax for robust app discovery and Play Store fallback.
 */
export declare const launchUPI: (config: UPIConfig, app?: UPIApp) => string | void;

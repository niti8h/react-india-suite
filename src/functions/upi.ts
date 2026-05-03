/**
 * upiIntent.ts
 * Core logic for generating and launching UPI deep links.
 */

export interface UPIConfig {
    pa: string;     // Payee Address (VPA/UPI ID) - Required
    pn: string;     // Payee Name - Required
    am?: string;    // Amount (e.g., "500.00")
    tr?: string;    // Transaction Reference ID (for reconciliation)
    tn?: string;    // Transaction Note (e.g., "Order #123")
    mc?: string;    // Merchant Code (Optional)
    cu?: string;    // Currency (Defaults to INR)
}

export type UPIApp = 'google-pay' | 'phonepe' | 'paytm' | 'bhim' | 'any';

/**
 * Generates a standardized upi://pay URI according to NPCI specifications.
 */
export const generateUPILink = (config: UPIConfig): string => {
    const { pa, pn, am, tr, tn, mc, cu = 'INR' } = config;

    if (!pa || !pn) {
        throw new Error("Missing mandatory parameters: 'pa' and 'pn' are required.");
    }

    const url = new URL('upi://pay');
    url.searchParams.append('pa', pa);
    url.searchParams.append('pn', pn);
    url.searchParams.append('cu', cu);

    if (am) url.searchParams.append('am', parseFloat(am).toFixed(2));
    if (tr) url.searchParams.append('tr', tr);
    if (tn) url.searchParams.append('tn', tn);
    if (mc) url.searchParams.append('mc', mc);

    // decodeURIComponent ensures the upi://pay? format remains clean
    return decodeURIComponent(url.toString());
};

/**
 * Launches the UPI app based on platform (iOS/Android/Generic).
 * Uses Android Intent syntax for robust app discovery and Play Store fallback.
 */
export const launchUPI = (config: UPIConfig, app: UPIApp = 'any'): string | void => {
    const baseLink = generateUPILink(config);
    const params = baseLink.split('?')[1];

    if (typeof window === 'undefined') return;

    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);

    // App-specific identifiers
    const appMap = {
        'google-pay': { ios: 'tez://upi/pay?', android: 'com.google.android.apps.nbu.paisa.user' },
        'phonepe': { ios: 'phonepe://upi/pay?', android: 'com.phonepe.app' },
        'paytm': { ios: 'paytmmp://upi/pay?', android: 'net.one97.paytm' },
        'bhim': { ios: 'bhim://upi/pay?', android: 'in.org.npci.upiapp' },
    };

    if (app === 'any') {
        // Standard system chooser launch
        window.location.href = baseLink;
        return baseLink;
    }

    const selected = appMap[app];

    if (isIOS) {
        // iOS requires direct URI schemes
        const iosLink = `${selected.ios}${params}`;
        window.location.href = iosLink;
        return iosLink;
    } else if (isAndroid) {
        /**
         * Android "Intent" syntax:
         * - Forces a specific app via package name.
         * - Falls back to Play Store if the app isn't installed.
         */
        const androidIntent = `intent://pay?${params}#Intent;scheme=upi;package=${selected.android};end`;
        window.location.href = androidIntent;
        return androidIntent;
    } else {
        // Desktop or other fallback - return baseLink for QR generation
        console.warn("UPI Intent launch is only supported on mobile devices.");
        return baseLink;
    }
};
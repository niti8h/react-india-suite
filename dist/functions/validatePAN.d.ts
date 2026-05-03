export default function checkPanDetails(pan: string): {
    panNumber: string | null;
    isValid: boolean;
    panType: string;
};

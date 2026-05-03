export interface BankDetails {
    bank: string;
    ifsc: string;
    branch: string;
    address: string;
    contact: string;
    city: string;
    district: string;
    state: string;
    bankCode: string;
    micr: string | null;
    swift: string | null;
    upi: boolean;
    rtgs: boolean;
    neft: boolean;
    imps: boolean;
}

export default async function getBranchFromIFSC(ifscCode: string): Promise<BankDetails | null> {
    if (ifscCode.length === 11) {
        try {
            const res = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
            if (res.ok) {
                const data = await res.json();

                return {
                    bank: data.BANK || "",
                    ifsc: data.IFSC || "",
                    branch: data.BRANCH || "",
                    address: data.ADDRESS || "",
                    contact: data.CONTACT || "",
                    city: data.CITY || "",
                    district: data.DISTRICT || "",
                    state: data.STATE || "",
                    bankCode: data.BANKCODE || "",
                    micr: data.MICR || null,
                    swift: data.SWIFT || null,
                    upi: data.UPI || false,
                    rtgs: data.RTGS || false,
                    neft: data.NEFT || false,
                    imps: data.IMPS || false
                };
            }
        } catch (err) {
            console.error("Invalid IFSC");
        }
    }
    return null;
}
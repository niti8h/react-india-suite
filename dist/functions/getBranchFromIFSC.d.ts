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
export default function getBranchFromIFSC(ifscCode: string): Promise<BankDetails | null>;

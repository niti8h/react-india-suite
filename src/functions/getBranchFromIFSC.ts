export default async function getBranchFromIFSC(ifscCode: string): Promise<{}> {
    if (ifscCode.length === 11) {
        try {
            const res = await fetch(`https://ifsc.razorpay.com/${ifscCode}`);
            if (res.ok) {
                const data = await res.json();
                return data;
            }
        } catch (err) {
            console.error("Invalid IFSC");
        }
    }
    return {};
}
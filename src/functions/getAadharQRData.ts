import pako from 'pako';
import { KJUR, X509 } from 'jsrsasign';
export default async function getAadharQRData(hash: string): Promise<{}> {
    const HARDCODED_CERT = `-----BEGIN CERTIFICATE-----
MIIHzTCCBrWgAwIBAgIEYkxPUDANBgkqhkiG9w0BAQsFADCBkTELMAkGA1UEBhMC
SU4xQTA/BgNVBAoTOEd1amFyYXQgTmFybWFkYSBWYWxsZXkgRmVydGlsaXplcnMg
YW5kIENoZW1pY2FscyBMaW1pdGVkMQ8wDQYDVQQLEwZTdWItQ0ExLjAsBgNVBAMT
JShuKUNvZGUgU29sdXRpb25zIFN1Yi1DQSBmb3IgRFNDIDIwMjIwHhcNMjYwMjAz
MDk1NjEyWhcNMjkwMjAzMTcyODM2WjCCAQYxCzAJBgNVBAYTAklOMTEwLwYDVQQK
EyhVTklRVUUgSURFTlRJRklDQVRJT04gQVVUSE9SSVRZIE9GIElORElBMQ8wDQYD
VQQREwYxMTAwMDExDjAMBgNVBAgTBURlbGhpMUMwQQYDVQQJEzpCQU5HTEEgU0FI
SUIgUk9BRCBCRUhJTkQgS0FMSSBNQU5ESVIgR09MRSBNQVJLRVQgTkVXIERFTEhJ
MSUwIwYDVQQzExw0VEggRkxPT1IgVUlEQUkgSEVBRFFVQVJURVJTMTcwNQYDVQQD
Ey5EUyBVbmlxdWUgSWRlbnRpZmljYXRpb24gQXV0aG9yaXR5IG9mIEluZGlhIDA2
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh1+zYnvbcEm0Yz73s5u4
2odpUJMr9wv5bVw7sOE5nFNbrB+U++5I0f8cL2HoHnJOkwvLZzrD0jG/vxAKi6vi
i/gjEzUEgrkdIHxMP3D6GJs0MSQHiEXvIGOwPIH3BLtBOc3m28NVNT6Q9iq0gUwu
xnlhV38UdNhCllqNYhWmAMPJkImgaKrRZvY2pWNs6gd+PlAF/9SO69x3+1meA8kP
k2ZvQanZlx9tfaExeOe9or3NQiKy2+UbtXrpcoAfYbbWi1OUzXi5bJdhbGp239c1
fX6UKyUM5IUMY+m3I7wu2WQ7lmeO2n/vwzQz/PKHXPWYu3bydWMLdCi07vOQBqzC
KwIDAQABo4IDszCCA68wDgYDVR0PAQH/BAQDAgbAMCoGA1UdJQQjMCEGCCsGAQUF
BwMEBgorBgEEAYI3CgMMBgkqhkiG9y8BAQUwggECBgNVHSAEgfowgfcwgYYGBmCC
ZGQCAjB8MHoGCCsGAQUFBwICMG4MbENsYXNzIDIgY2VydGlmaWNhdGVzIGFyZSB1
c2VkIGZvciBmb3JtIHNpZ25pbmcsIGZvcm0gYXV0aGVudGljYXRpb24gYW5kIHNp
Z25pbmcgb3RoZXIgbG93IHJpc2sgdHJhbnNhY3Rpb25zLjBsBgZggmRkCgEwYjBg
BggrBgEFBQcCAjBUDFJUaGlzIGNlcnRpZmljYXRlIHByb3ZpZGVzIGhpZ2hlciBs
ZXZlbCBvZiBhc3N1cmFuY2UgZm9yIGRvY3VtZW50IHNpZ25pbmcgZnVuY3Rpb24u
MIGsBggrBgEFBQcBAQSBnzCBnDA+BggrBgEFBQcwAYYyaHR0cDovL29jc3AubmNv
ZGUuaW4vbkNvZGVTb2x1dGlvbnNTdWJDQWZvckRTQzIwMjIwWgYIKwYBBQUHMAKG
Tmh0dHBzOi8vd3d3Lm5jb2Rlc29sdXRpb25zLmNvbS9yZXBvc2l0b3J5L0NBLVNl
cnZpY2VzLTIwMjIvbmNvZGVjYTIyU3ViY2ExLmRlcjAMBgNVHRMBAf8EAjAAMCIG
A1UdEQQbMBmBF2Rpci5jcm0taHFAdWlkYWkubmV0LmluMIIBAAYDVR0fBIH4MIH1
MEKgQKA+hjxodHRwOi8vd3d3Lm5jb2Rlc29sdXRpb25zLmNvbS9yZXBvc2l0b3J5
L25jb2RlY2EyMnN1YmNhMS5jcmwwga6ggauggaikgaUwgaIxCzAJBgNVBAYTAklO
MUEwPwYDVQQKEzhHdWphcmF0IE5hcm1hZGEgVmFsbGV5IEZlcnRpbGl6ZXJzIGFu
ZCBDaGVtaWNhbHMgTGltaXRlZDEPMA0GA1UECxMGU3ViLUNBMS4wLAYDVQQDEyUo
bilDb2RlIFNvbHV0aW9ucyBTdWItQ0EgZm9yIERTQyAyMDIyMQ8wDQYDVQQDEwZD
Ukw0MTIwKwYDVR0QBCQwIoAPMjAyNjAyMDMwOTU2MTJagQ8yMDI5MDIwMzE3Mjgz
NlowHwYDVR0jBBgwFoAURsE2obZEOWzewDFm8UhoheJjvzswHQYDVR0OBBYEFGZ+
DVgYpnloELJVhydpAEQE3qV7MBkGCSqGSIb2fQdBAAQMMAobBFY4LjMDAgMoMA0G
CSqGSIb3DQEBCwUAA4IBAQACmoprnogLK9HqtpDeMPGuTN98tA7ZSOKqs9S+PGIi
z8h8MnxnlNuUr6HVfe4wWImEeDcfIHWUCPjx/QWy0XeqC09+cwnhdRoQA20CnUMY
vWoOE9zkOzeks0dEzUD9ENeyG6ToxwHrzSogVO6AZ25dDrgpMtqKLlL0DYkNtZke
zT3OnRSVeYCKhvaLlDS9SlwaVKjMzIxDQu190lRwqSXyKC7U8LWVkniB7+rEeiaD
A+9M0jnYvUAj5Jzdp6DuEU94m2RglS3zoHq88OKm/QnayZNBVWYRSrprEMKW3urG
Xm5JdIO8PkWeSc0JbZJUNg2MBNqzhFDzCjqnf4DIOJdE
-----END CERTIFICATE-----`;




    const UIDAI_PUBLIC_KEY_PEM = HARDCODED_CERT;
    function bigIntToByteArray(bigInt: BigInt) {

        let hex = bigInt.toString(16);
        if (hex.length % 2 !== 0) hex = '0' + hex;

        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
        }
        return bytes;
    }

    const splitFields = (decompressedData: Uint8Array): Uint8Array[] => {
        const fields = [];
        let start = 0;

        for (let i = 0; i < decompressedData.length; i++) {
            if (decompressedData[i] === 255) {
                fields.push(decompressedData.slice(start, i));
                start = i + 1;
            }
        }
        fields.push(decompressedData.slice(start));
        return fields;
    };
    function verifyAadhaarSignature(signedData: Uint8Array, signature: Uint8Array, certPem: string): boolean {
        try {
            const sig = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
            const x = new X509();
            x.readCertPEM(certPem);
            sig.init(x.getPublicKey());

            // Convert buffers to Hex for jsrsasign
            const dataHex = Array.from(signedData).map(b => b.toString(16).padStart(2, '0')).join('');
            const sigHex = Array.from(signature).map(b => b.toString(16).padStart(2, '0')).join('');

            sig.updateHex(dataHex);
            return sig.verify(sigHex);
        } catch (err) {
            console.error("Verification error:", err);
            return false;
        }
    }

    try {

        const bytes = bigIntToByteArray(BigInt(hash));
        const inflated = pako.inflate(bytes);
        const fields = splitFields(inflated);

        const decoder = new TextDecoder("utf-8");
        const getString = (index: number) => fields[index] ? decoder.decode(fields[index]).trim() : "";

        const signatureRaw = inflated.slice(-256);
        const dataToVerify = inflated.slice(0, -256);
        const dataFields = splitFields(dataToVerify);
        const isSignatureValid = verifyAadhaarSignature(dataToVerify, signatureRaw, UIDAI_PUBLIC_KEY_PEM);
        return {
            header: getString(0),
            signatureStatus: isSignatureValid,
            referenceId: getString(2),
            name: getString(3),
            dob: getString(4),
            gender: getString(5),
            careOf: getString(6),
            district: getString(7),
            house: getString(9),
            street: getString(10),
            pincode: getString(11),
            vtc: getString(12),
            state: getString(13),
            subDistrict: getString(15),
            maskedMobile: getString(17),
            fullAddress: getString(6) + ", " + getString(7) + ", " + getString(9) + ", " + getString(10) + ", " + getString(11) + ", " + getString(12) + ", " + getString(13) + ", " + getString(15),
            signatureRaw: fields[fields.length - 1] // The actual 256-byte signature
        };



    } catch (error) {
        console.log(error);
    }

    return {};
}
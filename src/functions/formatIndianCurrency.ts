/**
 * Formats a number into the Indian Lakhs/Crores system.
 * Example: 100000 -> 1,00,000
 */
export default function formatIndianCurrency(amount: number, symbol = '₹'): string {
    if (!amount && amount !== 0) return "";

    const value = amount.toString();
    const [integer, fraction] = value.split('.');

    let lastThree = integer.substring(integer.length - 3);
    const otherNumbers = integer.substring(0, integer.length - 3);

    const formattedInteger = otherNumbers !== ""
        ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree
        : lastThree;

    return fraction ? `${symbol}${formattedInteger}.${fraction.slice(0, 2)}` : `${symbol}${formattedInteger}`;
};
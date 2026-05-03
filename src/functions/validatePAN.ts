export default function checkPanDetails(pan: string): { panNumber: string | null, isValid: boolean, panType: string } {
    if (!pan) return { panNumber: null, isValid: false, panType: "Unknown" };

    const panUpper = pan.toUpperCase().trim();

    // Regex for structural validation:
    // Characters 1-3: Alphabets
    // Character 4: Entity code (P, C, H, F, A, T, B, L, J, G)
    // Character 5: Alphabet (Surname/Entity first letter)
    // Characters 6-9: Numeric
    // Character 10: Alphabet
    const panRegex = /^[A-Z]{3}[PCHFATBLJG]{1}[A-Z]{1}[0-9]{4}[A-Z]{1}$/;

    const isValid = panRegex.test(panUpper);

    // Mapping of the 4th character to the entity type
    const entityMapping = {
        'P': 'Individual',
        'C': 'Company',
        'H': 'Hindu Undivided Family (HUF)',
        'F': 'Firm',
        'A': 'Association of Persons (AOP)',
        'T': 'Trust',
        'B': 'Body of Individuals (BOI)',
        'L': 'Local Authority',
        'J': 'Artificial Juridical Person',
        'G': 'Government Agency'
    };

    let type = "Invalid Format";
    if (isValid) {
        const typeCode = panUpper[3] as keyof typeof entityMapping;
        type = entityMapping[typeCode] || "Unknown Entity";
    }

    return {
        panNumber: panUpper,
        isValid: isValid,
        panType: type
    };
}
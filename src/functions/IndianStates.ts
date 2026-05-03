import districts from "../static/stateDistricts.json"
export interface IndiaState {
    code: string;       // GST Prefix / Census Code
    symbol: string;     // Short Abbreviation (e.g., HR, PB)
    name: string;       // Full Name
    type: 'State' | 'UT';
}

export const INDIA_STATES: IndiaState[] = [
    { code: "01", symbol: "JK", name: "Jammu and Kashmir", type: "UT" },
    { code: "02", symbol: "HP", name: "Himachal Pradesh", type: "State" },
    { code: "03", symbol: "PB", name: "Punjab", type: "State" },
    { code: "04", symbol: "CH", name: "Chandigarh", type: "UT" },
    { code: "05", symbol: "UK", name: "Uttarakhand", type: "State" },
    { code: "06", symbol: "HR", name: "Haryana", type: "State" },
    { code: "07", symbol: "DL", name: "Delhi", type: "UT" },
    { code: "08", symbol: "RJ", name: "Rajasthan", type: "State" },
    { code: "09", symbol: "UP", name: "Uttar Pradesh", type: "State" },
    { code: "10", symbol: "BR", name: "Bihar", type: "State" },
    { code: "11", symbol: "SK", name: "Sikkim", type: "State" },
    { code: "12", symbol: "AR", name: "Arunachal Pradesh", type: "State" },
    { code: "13", symbol: "NL", name: "Nagaland", type: "State" },
    { code: "14", symbol: "MN", name: "Manipur", type: "State" },
    { code: "15", symbol: "MZ", name: "Mizoram", type: "State" },
    { code: "16", symbol: "TR", name: "Tripura", type: "State" },
    { code: "17", symbol: "ML", name: "Meghalaya", type: "State" },
    { code: "18", symbol: "AS", name: "Assam", type: "State" },
    { code: "19", symbol: "WB", name: "West Bengal", type: "State" },
    { code: "20", symbol: "JH", name: "Jharkhand", type: "State" },
    { code: "21", symbol: "OR", name: "Odisha", type: "State" },
    { code: "22", symbol: "CT", name: "Chhattisgarh", type: "State" },
    { code: "23", symbol: "MP", name: "Madhya Pradesh", type: "State" },
    { code: "24", symbol: "GJ", name: "Gujarat", type: "State" },
    { code: "26", symbol: "DN", name: "Dadra and Nagar Haveli and Daman and Diu", type: "UT" },
    { code: "27", symbol: "MH", name: "Maharashtra", type: "State" },
    { code: "29", symbol: "KA", name: "Karnataka", type: "State" },
    { code: "30", symbol: "GA", name: "Goa", type: "State" },
    { code: "31", symbol: "LD", name: "Lakshadweep", type: "UT" },
    { code: "32", symbol: "KL", name: "Kerala", type: "State" },
    { code: "33", symbol: "TN", name: "Tamil Nadu", type: "State" },
    { code: "34", symbol: "PY", name: "Puducherry", type: "UT" },
    { code: "35", symbol: "AN", name: "Andaman and Nicobar Islands", type: "UT" },
    { code: "36", symbol: "TG", name: "Telangana", type: "State" },
    { code: "37", symbol: "AP", name: "Andhra Pradesh", type: "State" },
    { code: "38", symbol: "LA", name: "Ladakh", type: "UT" }
];
export const findState = (query: string) => {
    const upperQuery = query.toUpperCase();
    return INDIA_STATES.find(s =>
        s.code === query ||
        s.symbol === upperQuery ||
        s.name.toUpperCase() === upperQuery
    );
};
export const findDistrict = (stateName: string) => {
    const state = findState(stateName);
    if (!state) return [];

    const allRegions = [...districts.states, ...districts.union_territories];
    const matchedRegion = allRegions.find(r => r.name.toLowerCase() === state.name.toLowerCase());

    return matchedRegion ? matchedRegion.districts : [];
}



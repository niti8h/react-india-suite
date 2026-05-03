export interface IndiaState {
    code: string;
    symbol: string;
    name: string;
    type: 'State' | 'UT';
}
export declare const INDIA_STATES: IndiaState[];
export declare const findState: (query: string) => IndiaState | undefined;
export declare const findDistrict: (stateName: string) => string[];

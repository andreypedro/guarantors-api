export interface IAddress {
    street?: string;
    number?: string;
    city?: string;
    state?: string;
    zip?: string;
    status: 'valid' | 'corrected' | 'unverifiable';
    originalInput: string;
    correctedInput?: string;
}
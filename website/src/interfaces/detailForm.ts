export interface DetailFormInterface<T> {
    data: T;
    onUpdateSuccess?: (formData: T) => Promise<void>;
}
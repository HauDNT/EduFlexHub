export interface UploadImageButtonInterface {
    form: any,
    name: string;
    label: string;
    callback?: (file: File) => Promise<void>;
    oldImageExist?: boolean;
    oldImageUrl?: string;
}
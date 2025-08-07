import { Theme} from "@/types";
import React, { FormEvent } from "react";

// Authen
export interface LoginResponseInterface {
    role: any;
    userId: string,
    username: string,
    accessToken: string,
}

// Redux
interface ReduxUserState {
    role: any;
    userId: string,
    username: string,
    email: string,
}

export interface ReduxAuthState {
    userAuth: ReduxUserState | null,
    token: string | null,
}

// Reset password forms steps
export interface StepResetForm {
    id: string | number,
    name: string,
    fieldsName: string[],
}

// Theme
export interface ThemeState {
    theme: Theme;
    isInitialized: boolean;
}

// Form
export interface FormInterface<T = any> {
  onSubmit: (formData: T) => Promise<void>;
  className?: string;
  onClose?: () => void;
}

// Model layer
export interface ModelLayerInterface {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    className?: string;
    maxWidth?: string;
}

export interface SearchbarInterface {
    placeholder?: string;
    onSearch: (query: string, searchFields?: string[]) => void;
    debounceTime?: number;
}

export * from '@/interfaces/metaPaginate';
export * from '@/interfaces/table';
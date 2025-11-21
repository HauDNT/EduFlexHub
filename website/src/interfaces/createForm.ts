export interface CreateFormInterface<T = any> {
  onSubmit: (formData: T) => Promise<void>;
  className?: string;
  onClose?: () => void;
}
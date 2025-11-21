export function enumValidation(enumObject: any, value: number): boolean {
    return Object.values(enumObject).includes(value);
}
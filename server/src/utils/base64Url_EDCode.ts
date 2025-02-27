import * as crypto from 'crypto'

export function base64UrlEncode(str: string): string {
    return Buffer.from(str).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Hàm decode base64Url
export function base64UrlDecode(str: string): string {
    return Buffer.from(str.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString();
}

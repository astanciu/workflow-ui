import * as jsSHA from 'jssha';

export function randomString(length: number): string {
  const validChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  array = array.map(x => validChars.charCodeAt(x % validChars.length));

  return String.fromCharCode(...array);
}

export function urlEncodeB64(input: string): string {
  const b64Chars = { '+': '-', '/': '_', '=': '' };

  return input.replace(/[+/=]/g, m => b64Chars[m]);
}

export function bufferToBase64UrlEncoded(input: ArrayBuffer): string {
  var bytes = new Uint8Array(input);
  return urlEncodeB64(window.btoa(String.fromCharCode(...bytes)));
}

export function sha256(message: string): ArrayBuffer {
  const sha256 = new jsSHA('SHA-256', 'TEXT');
  sha256.update(message);
  const hash = sha256.getHash('ARRAYBUFFER');

  return hash;
}

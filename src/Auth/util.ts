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
  // @ts-ignore
  return input.replace(/[\+\/=]/g, m => b64Chars[m]);
}

export function bufferToBase64UrlEncoded(input: ArrayBuffer): string {
  var bytes = new Uint8Array(input);
  return urlEncodeB64(window.btoa(String.fromCharCode(...bytes)));
}

// export function sha2562(message: string): PromiseLike<ArrayBuffer> {
//   let encoder = new TextEncoder();
//   let data = encoder.encode(message);

//   // @ts-ignore
//   return window.crypto.subtle.digest('SHA-256', data);
// }

export function sha256(message: string): ArrayBuffer {
  //  let encoder = new TextEncoder();
  // let data = encoder.encode(message);

  // return window.crypto.subtle.digest('SHA-256', data);
  const sha256 = new jsSHA('SHA-256', 'TEXT');
  sha256.update(message);
  const hash = sha256.getHash('ARRAYBUFFER');

  return hash;
}

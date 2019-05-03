import moment from 'moment';

import { randomString, sha256, bufferToBase64UrlEncoded } from './util';

export type AuthError = {
  error: string;
  error_description?: string;
};

export type TokenSet = {
  access_token: string;
  id_token: string;
  expires_in: number;
  scope?: string;
  token_type?: string;
};

export type AuthResult = TokenSet | AuthError;

class Authentication {
  private client_id: string = 'Ct4gc9rE88RelvUEZs5RfizIHEe9iN5E';
  private domain: string = 'wfl.auth0.com';
  private redirect_uri: string = `${window.location.origin}/login/callback`;
  private auth_endpoint: string = `https://${this.domain}/authorize`;
  private token_endpoint: string = `https://${this.domain}/oauth/token`;
  private audience = 'https://workflow.dev/';

  async login() {
    this.clearAuthData();
    const state = randomString(32);
    const codeVerifier = randomString(32);
    const codeChallenge = bufferToBase64UrlEncoded(sha256(codeVerifier));

    localStorage.setItem(`login-code-verifier-${state}`, codeVerifier);

    const loginUrl = new URL(this.auth_endpoint);
    loginUrl.search = new URLSearchParams({
      audience: this.audience,
      redirect_uri: this.redirect_uri,
      client_id: this.client_id,
      response_type: 'code',
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state,
    }).toString();

    window.location.assign(loginUrl.toString());
  }

  logout() {
    this.clearAuthData();
  }

  async callback(): Promise<[TokenSet | null, AuthError | null]> {
    const search = new URLSearchParams(window.location.search);
    const error = search.get('error');
    const error_description = search.get('error_description') || '';
    if (error) {
      return [null, { error, error_description }];
    }

    if (!search.has('code')) {
      return [null, { error: 'code not found' }];
    }
    const code = search.get('code');
    const state = search.get('state');
    const code_verifier = localStorage.getItem(`login-code-verifier-${state}`);
    localStorage.removeItem(`login-code-verifier-${state}`);

    if (!code_verifier) {
      return [null, { error: 'unexpected state parameter' }];
    }

    const tokenSet = await fetch(this.token_endpoint, {
      method: 'POST',
      // @ts-ignore
      body: new URLSearchParams({
        audience: this.audience,
        client_id: this.client_id,
        redirect_uri: this.redirect_uri,
        grant_type: 'authorization_code',
        code_verifier,
        code,
      }).toString(),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
      }),
    }).then((r) => r.json());

    let user = await this.getUser(tokenSet);
    this.storeAuthData(tokenSet, user);

    return [user, null];
  }

  async getUser(tokenSet: TokenSet) {
    const url = `https://${this.domain}/userinfo`;
    const user = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokenSet.access_token}`,
      },
    }).then((r) => r.json());

    return user;
  }

  private getStoredSession() {
    try {
      let user = localStorage.getItem('user');
      let expires_at = localStorage.getItem('expires_at') || '0';

      // Is it expired?
      let expires = parseInt(expires_at, 10);
      let now = moment().utc();
      let exp = moment.utc(expires);
      if (now.isAfter(exp)) {
        return null;
      }

      user = JSON.parse(user || '');

      return user;
    } catch (err) {
      console.log('Error retrieving stored session. Proceeding with new login.', err);

      return null;
    }
  }

  private storeAuthData(tokenSet: TokenSet, user) {
    localStorage.setItem('id_token', tokenSet.id_token);
    localStorage.setItem('access_token', tokenSet.access_token);
    localStorage.setItem('expires_at', this.getExpiresAt(tokenSet.id_token));
    localStorage.setItem('user', JSON.stringify(user));
  }

  private clearAuthData() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
  }

  private getExpiresAt(token): string {
    let expires_at = 0;
    try {
      let body = token.split('.')[1];
      body = JSON.parse(atob(body));
      expires_at = body.exp - 10 * 1000; // shorten by 10 seconds
    } catch (err) {
      console.log('Failed to getExpiresAt: ', err);
    }

    return expires_at.toString();
  }
}

export const Auth = new Authentication();

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
    this.clearTokenSet();
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
      state: state
    }).toString();

    window.location.assign(loginUrl.toString());
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
        code
      }).toString(),
      headers: new Headers({
        'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    }).then(r => r.json());

    this.storeTokenSet(tokenSet);
    let user = await this.getUser(tokenSet);
    console.log(user);
    return [tokenSet, null];
  }

  async getUser(tokenSet: TokenSet) {
    const url = `https://${this.domain}/userinfo`;
    const user = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokenSet.access_token}`
      }
    }).then(r => r.json());

    return user;
  }

  storeTokenSet(tokenSet: TokenSet) {
    localStorage.setItem('id_token', tokenSet.id_token);
    localStorage.setItem('access_token', tokenSet.access_token);
    localStorage.setItem('expires_in', tokenSet.expires_in.toString());
  }

  clearTokenSet() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_in');
  }
}

export const Auth = new Authentication();

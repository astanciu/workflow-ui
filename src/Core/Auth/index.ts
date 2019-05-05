import moment from 'moment';

import { randomString, sha256, bufferToBase64UrlEncoded } from './util';

type AuthorizationResponse = {
  code: string | null | undefined;
  state: string | null | undefined;
  error: string | null | undefined;
  error_description: string | null | undefined;
};

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

export type User = {
  user_id: string;
  email: string;
  email_verified: string;
  picture: string;
  name: string;
};

export type AuthResult = User | AuthError;

class Authentication {
  private client_id: string = 'Ct4gc9rE88RelvUEZs5RfizIHEe9iN5E';
  private a0domain: string = 'wfl.auth0.com';
  private wflDomain: string = `${window.location.origin}`;
  private redirect_uri: string = `${this.wflDomain}/login/callback`;
  private logout_uri: string = `https://${this.a0domain}/v2/logout`;
  private auth_endpoint: string = `https://${this.a0domain}/authorize`;
  private token_endpoint: string = `https://${this.a0domain}/oauth/token`;
  private audience = 'https://workflow.dev/';

  async login() {
    let user;

    try {
      user = this.isLoggedIn() || (await this.silentRefresh());

      if (user) {
        return user;
      }
    } catch (err) {
      // continue below with normal login
    }

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
    return null;
  }

  logout() {
    this.clearAuthData();
    const logoutUrl = new URL(this.logout_uri);
    logoutUrl.search = new URLSearchParams({
      returnTo: `${this.wflDomain}/logout?done=true`,
      client_id: this.client_id,
    }).toString();

    window.location.assign(logoutUrl.toString());
  }

  isLoggedIn() {
    return this.getStoredSession();
  }

  async callback(): Promise<[User | null, AuthError | null]> {
    const search = new URLSearchParams(window.location.search);
    const authzResp: AuthorizationResponse = {
      code: search.get('code'),
      state: search.get('state'),
      error: search.get('error'),
      error_description: search.get('error_description'),
    };

    return this.processAuthorizationResponse(authzResp);
  }

  async silentRefresh() {
    const state = randomString(32);
    const codeVerifier = randomString(32);
    localStorage.setItem(`login-code-verifier-${state}`, codeVerifier);
    const codeChallenge = bufferToBase64UrlEncoded(sha256(codeVerifier));
    const authorizationEndpointUrl = new URL(this.auth_endpoint);

    // here we encode the authorization request
    authorizationEndpointUrl.search = new URLSearchParams({
      audience: this.audience,
      redirect_uri: this.redirect_uri,
      client_id: this.client_id,
      response_type: 'code',
      response_mode: 'web_message',
      prompt: 'none',
      scope: 'openid profile email',
      code_challenge: codeChallenge,
      code_challenge_method: 'S256',
      state: state,
    }).toString();

    //load the url in an iframe and wait for the response
    const authzResp = await new Promise<AuthorizationResponse>((resolve, reject) => {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';

      const timeoutSetTimeoutId = setTimeout(() => {
        reject(new Error('timed out'));
        window.document.body.removeChild(iframe);
      }, 60 * 1000);

      function responseHandler(e) {
        if (e.origin !== authorizationEndpointUrl.origin || e.data.type !== 'authorization_response') {
          return;
        }
        e.source.close();
        clearTimeout(timeoutSetTimeoutId);
        window.removeEventListener('message', responseHandler, false);
        window.document.body.removeChild(iframe);
        const response = e.data.response as AuthorizationResponse;
        if (response.error) {
          return reject(response);
        }
        if (response.state !== state) {
          return reject(new Error('State does not match.'));
        }
        resolve(response);
      }

      window.addEventListener('message', responseHandler);
      window.document.body.appendChild(iframe);
      iframe.setAttribute('src', authorizationEndpointUrl.toString());
    });

    const [user, error] = await this.processAuthorizationResponse(authzResp);
    console.log(user, error);
  }

  async getUser(tokenSet: TokenSet): Promise<User> {
    const url = `https://${this.a0domain}/userinfo`;
    const user = await fetch(url, {
      headers: {
        Authorization: `Bearer ${tokenSet.access_token}`,
      },
    }).then((r) => r.json());

    user.user_id = user.sub;
    delete user.sub;

    return user;
  }

  async getToken() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      throw new Error('No Token');
    }

    return token;
  }

  private async processAuthorizationResponse(authz: AuthorizationResponse): Promise<[User | null, AuthError | null]> {
    const error = authz.error;
    const error_description = authz.error_description || '';
    const code = authz.code;
    const state = authz.state;

    if (error) {
      return [null, { error, error_description }];
    }

    if (!code) {
      return [null, { error: 'code not found' }];
    }
    const code_verifier = localStorage.getItem(`login-code-verifier-${state}`);
    // localStorage.removeItem(`login-code-verifier-${state}`);
    this.cleanTempLocalStorate();

    if (!code_verifier) {
      return [null, { error: 'unexpected state parameter' }];
    }

    const tokenSet = await fetch(this.token_endpoint, {
      method: 'POST',
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

  private getStoredSession() {
    try {
      if (this.isTokenExpired()) return null;

      let user = localStorage.getItem('user');
      user = JSON.parse(user || '');

      return user;
    } catch (err) {
      console.log('Error retrieving stored session. Proceeding with new login.', err);

      return null;
    }
  }

  private isTokenExpired(): boolean {
    let access_token = localStorage.getItem('access_token');
    if (!access_token) return true;

    let expires_at = this.getExpiresAt(access_token);
    if (!expires_at) {
      return true;
    }

    let expires = parseInt(expires_at, 10);
    let now = moment().utc();
    let exp = moment.utc(expires);
    if (now.isAfter(exp)) {
      return true;
    }

    return false;
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
      expires_at = body.exp * 1000; // shorten by 10 seconds
    } catch (err) {
      console.log('Failed to getExpiresAt: ', err);
    }

    return expires_at.toString();
  }

  private cleanTempLocalStorate() {
    for (var key in localStorage) {
      if (key.includes('login-code-verifier')) {
        localStorage.removeItem(key);
      }
    }
  }
}

export const Auth = new Authentication();

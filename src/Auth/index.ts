import { randomString, sha256, bufferToBase64UrlEncoded } from './util';

class Authentication {
  private client_id: string = 'Ct4gc9rE88RelvUEZs5RfizIHEe9iN5E';
  private domain: string = 'wfl.auth0.com';
  private redirect_uri: string = `${window.location.origin}/login/callback`;
  private auth_endpoint: string = `https://${this.domain}/authorize`;
  private token_endpoint: string = `https://${this.domain}/oauth/token`;

  private audience = 'https://workflow.dev/';

  constructor() {}

  async login() {
    console.log(`Loging in...`);

    const state = randomString(32);
    const codeVerifier = randomString(32);
    const codeChallenge = bufferToBase64UrlEncoded(sha256(codeVerifier));

    sessionStorage.setItem(`login-code-verifier-${state}`, codeVerifier);

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

  async callback() {
    const search = new URLSearchParams(window.location.search);
    const error = search.get('error');
    const error_description = search.get('error_description');
    if (error) {
      return { error, error_description };
    }

    if (!search.has('code')) {
      return { error: 'code not found' };
    }
    const code = search.get('code');
    const state = search.get('state');
    const code_verifier = sessionStorage.getItem(
      `login-code-verifier-${state}`
    );

    // debugger;
    // sessionStorage.removeItem(`login-code-verifier-${state}`);

    if (!code_verifier) {
      console.error('unexpected state parameter');
      return { error: 'unexpected state parameter' };
    }

    // sessionStorage.

    // exchange the authorization code for a tokenset
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

    return tokenSet;
    //this has access_token, id_token, expires_in, scope, token_type.
    // console.dir();

    // window.tokenSet = tokenSet;
    // window.verifier = code_verifier;

    //remove the querystring from the url in the address bar
    // const url = new URL(window.location.origin);
    // url.search = '';
    // window.history.pushState('', document.title, url.toString());
  }
}

export const Auth = new Authentication();

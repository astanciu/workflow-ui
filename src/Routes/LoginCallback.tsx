import React, { useEffect, useState } from 'react';
import { Auth, AuthError, TokenSet, AuthResult } from 'Auth';
import { Link, RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps<any> {
  test: string;
}

export const LoginCallback = (props: RouteComponentProps<{}>) => {
  const [error, setError] = useState<AuthError | undefined>(undefined);
  const [tokens, setTokens] = useState<TokenSet | undefined>(undefined);
  useEffect(() => {
    const handleCallback = async () => {
      const [tokenSet, error] = await Auth.callback();

      if (error) {
        return setError(error);
      }

      if (tokenSet) {
        setTokens(tokenSet);
      }

      props.history.push('/');
    };

    handleCallback();
  }, [props, props.history]);

  if (error) {
    return (
      <div>
        Login Error: <strong>{error.error}</strong>
        <br />
        <p>{error.error_description}</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }

  if (tokens) {
    return (
      <div>
        Login Success: <strong>{tokens.id_token}</strong>
        <br />
        <Link to="/login">Login</Link>
      </div>
    );
  }

  return (
    <div>
      Login Callback <br />
      <Link to="/login">Login</Link>
    </div>
  );
};

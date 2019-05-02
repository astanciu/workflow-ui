import React, { useEffect, useState } from 'react';
import { Auth } from 'Auth';
import { Link } from 'react-router-dom';

type AuthError = {
  error: string;
  error_description: string;
};

export const LoginCallback = props => {
  const [error, setError] = useState<AuthError | undefined>(undefined);
  useEffect(() => {
    const handleCallback = async () => {
      console.log(`doing calback`);
      let result = await Auth.callback();
      console.log('Result', result);
      if (result.error) {
        return setError(result);
      }
    };

    handleCallback();
  }, []);

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

  return <div>Login Callback</div>;
};

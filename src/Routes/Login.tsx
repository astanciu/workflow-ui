import React from 'react';

import { Auth } from 'Auth';

export const Login = props => {
  console.log(props);
  Auth.login();

  return <div>Login</div>;
};

import React from 'react';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

export default function Google() {
  return (
    <React.Fragment>
      <GoogleOAuthProvider clientId="24895247008-58ndaa6djr06k6p12d6c02q61drlf8cl.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={() => {
            console.log('success');
          }}
          onError={() => {
            console.log('login failed');
          }}
        />
      </GoogleOAuthProvider>
    </React.Fragment>
  );
}

'use client';

import React from 'react';

export const MicrosoftSignInButton = ({type}:{type: string}) => {
  const handleMicrosoftSignIn = () => {
    const clientId = process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID;
    const redirectUri = encodeURIComponent(`${window.location.origin}/${process.env.NEXT_PUBLIC_MICROSOFT_REDIRECT_URI}`);
    const scopes = encodeURIComponent('User.Read openid profile email');

    const authUrl = `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?` +
      `client_id=${clientId}` +
      `&response_type=code` +
      `&redirect_uri=${redirectUri}` +
      `&response_mode=query` +
      `&scope=${scopes}`;

    window.location.href = authUrl;
  };

  return (
    <button
      type='button'
      aria-label="signin with Microsoft"
      className="max-w-[350px] text-body-color dark:text-body-color-dark dark:shadow-two mb-6 flex w-full items-center justify-center rounded-sm border border-stroke bg-[#f8f8f8] px-6 py-3 text-base outline-none transition-all duration-300 hover:border-primary hover:bg-primary/5 hover:text-primary dark:border-transparent dark:bg-[#2C303B] dark:hover:border-primary dark:hover:bg-primary/5 dark:hover:text-primary dark:hover:shadow-none"
      onClick={handleMicrosoftSignIn}
    >
      <span className="mr-3">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="27" height="27" viewBox="0 0 48 48">
          <path fill="#ff5722" d="M6 6H22V22H6z" transform="rotate(-180 14 14)"></path><path fill="#4caf50" d="M26 6H42V22H26z" transform="rotate(-180 34 14)"></path><path fill="#ffc107" d="M26 26H42V42H26z" transform="rotate(-180 34 34)"></path><path fill="#03a9f4" d="M6 26H22V42H6z" transform="rotate(-180 14 34)"></path>
        </svg>
      </span>
      {type} with Microsoft
    </button>
  );
};
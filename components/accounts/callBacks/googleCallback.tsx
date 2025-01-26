'use client';

import React, { useEffect } from 'react';
import axios from 'axios';
import { useSaveTokens } from '../utils/useSaveTokens';

export const GoogleCallback = () => {
  const SaveTokensToLocal = useSaveTokens();
  useEffect(() => {
    const fetchAccessToken = async (code: string) => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const response = await axios.post(`${baseUrl}/api/users/getGoogleUsrInfo/`, { code });
        SaveTokensToLocal(response.data);
      } catch (error) {
        console.error('Failed to sign in with Google', error);
      }
    };

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      fetchAccessToken(code as string);
    }
  }, [SaveTokensToLocal]);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100">
      <div className="relative flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
        <p className="mt-4 text-lg font-medium text-gray-600">Authenticating with Google...</p>
      </div>
    </div>
  );
};
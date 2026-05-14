import { createAuthClient } from 'better-auth/vue';

export const useAuthClient = () => {
  const config = useRuntimeConfig();
  const baseURL = process.server 
    ? config.public.betterAuthUrl || 'http://localhost:5000'
    : '';
  
  const authClient = createAuthClient({
    baseURL,
  });

  return authClient;
};

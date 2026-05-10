import { createAuthClient } from 'better-auth/vue';

export const useAuthClient = () => {
  const authClient = createAuthClient();

  return authClient;
};

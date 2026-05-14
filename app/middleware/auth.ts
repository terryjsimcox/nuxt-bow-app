export default defineNuxtRouteMiddleware(async (to, from) => {
  // Skip auth check for non-dashboard routes
  if (!to.path.startsWith('/dashboard')) {
    return;
  }

  const authClient = useAuthClient();

  try {
    const { data } = await authClient.getSession();

    // Redirect to signin if not authenticated
    if (!data) {
      return navigateTo('/signin', { replace: true });
    }
  } catch (error) {
    console.error('[Auth Middleware] Failed to fetch session:', error);
    return navigateTo('/signin', { replace: true });
  }
});

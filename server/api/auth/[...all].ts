import { auth } from '../../lib/auth';

export default defineEventHandler(async (event) => {
  return await auth.handler(toWebRequest(event));
});

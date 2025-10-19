import { createAuthClient } from 'better-auth/svelte';
import { apiKeyClient } from 'better-auth/client/plugins';
import { toast } from 'svelte-sonner';

export const client = createAuthClient({
  plugins: [apiKeyClient()],
  fetchOptions: {
    onError({ response }) {
      if (response.status === 429) {
        const retryAfter = response.headers.get('X-Retry-After');
        toast.error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
});

export const signIn = async () => {
  return await client.signIn.social(
    { provider: 'discord' },
    {
      onError: ({ error }) => {
        toast.error(error.message || 'An unknown error occurred');
      },
      onSuccess: () => {
        toast.success('Redirecting you to the dashboard...');
      },
    }
  );
};

export const { signOut, useSession } = client;

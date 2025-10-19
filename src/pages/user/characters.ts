import type { APIRoute } from 'astro';
import { updateProfile } from '~/lib/hooks/lodestone';
import { characters, user as User } from '~/db/schema';
import { eq, inArray } from 'drizzle-orm';
import { db } from '~/db/client';

/**
 * GET /user/characters
 * @summary Get user's characters
 * @description Gets the user's saved characters list. Requires an API key authentication.
 * @tag User
 * @security apiKeyHeader - API key authentication
 * @response 200 - Characters found
 * @responseContent {Character[]} 200.application/json
 * @response 401 - Unauthorized, missing or invalid API key.
 * @responseContent {Error} 401.application/json
 * @response 404 - Not found, user has no characters saved.
 * @responseContent {Error} 404.application/json
 */
export const GET: APIRoute = async ({ locals, url }) => {
  const { user } = locals;

  if (!user) {
    return Response.json(
      { code: 401, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const ids: string[] = user.characterIds ?? [];
  if (ids.length === 0) {
    return Response.json({ code: 404, message: 'Not found' }, { status: 404 });
  }

  let chars = await db
    .select()
    .from(characters)
    .where(inArray(characters.id, ids));

  const response = Response.json(chars, {
    headers: {
      'Cache-Control': 'private, max-age=60, stale-while-revalidate=300',
    },
  });

  // handles cache control
  const now = Date.now();
  const staleChars = chars.filter(char => {
    const parsedAt = char.parsed_at ? new Date(char.parsed_at).getTime() : 0;
    return now - parsedAt > 1000 * 60 * 60 * 5; // 5 hours
  });

  if (staleChars.length > 0) {
    try {
      await Promise.all(staleChars.map(char => updateProfile(char.id)));
    } catch (error) {
      console.error('Background refresh failed:', error);
    }
  }

  return response;
};

/**
 * PUT /user/characters
 * @summary Update user's characters
 * @description Update the user's saved characters list. If the character(s) already exist in the list, they will not be duplicated. Requires an API key authentication.
 * @tag User
 * @security apiKeyHeader - API key authentication
 * @bodyContent {string[]} application/json - An array of character IDs to add to the user's list.
 * @bodyRequired
 * @response 200 - Success, returns the updated list of character IDs.
 * @responseContent {object} 200.application/json
 * @response 400 - Bad request, invalid or missing character IDs.
 * @responseContent {Error} 400.application/json
 * @response 401 - Unauthorized, missing or invalid API key.
 * @responseContent {Error} 401.application/json
 */
export const PUT: APIRoute = async ({ locals, request }) => {
  const { user } = locals;

  if (!user) {
    return Response.json(
      { code: 401, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  const body = (await request.json()) as string[];
  const isStringArray =
    Array.isArray(body) && body.every(item => typeof item === 'string');
  if (!body || !isStringArray || body.length === 0) {
    return Response.json(
      { code: 400, message: 'Bad request' },
      { status: 400 }
    );
  }

  user.characterIds = body;

  await db
    .update(User)
    .set({ characterIds: user.characterIds })
    .where(eq(User.id, user.id));
  return Response.json({ code: 200, message: 'Success' }, { status: 200 });
};

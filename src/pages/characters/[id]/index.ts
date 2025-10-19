import type { APIRoute } from 'astro';
import { updateProfile } from '~/lib/hooks/lodestone';
import { characters } from '~/db/schema';
import { db } from '~/db/client';
import { eq } from 'drizzle-orm';

/**
 * GET /characters/{id}
 * @summary Get character from identifier
 * @description Gets a Lodestone character from an identifier, these characters are private by default. To access character collection data, you must be authenticated using an API key.
 * @tag Characters
 * @pathParam {string} id - The Lodestone character identifier
 * @response 200 - Success
 * @responseContent {Character} 200.application/json
 * @response default - An error occurred
 * @responseContent {Response} default.application/json
 */
export const GET: APIRoute = async ({ params, request }) => {
  if (!params.id)
    return Response.json(
      { code: 400, message: 'Bad request' },
      { status: 400 }
    );

  let char = await db
    .select()
    .from(characters)
    .where(eq(characters.id, params.id!))
    .get();

  if (!char) {
    char = (await updateProfile(params.id)) as typeof characters.$inferSelect;
    if (!char)
      return Response.json(
        { code: 404, message: 'Not found' },
        { status: 404 }
      );
  }

  const lastModified = char.parsed_at
    ? new Date(char.parsed_at).toUTCString()
    : new Date().toUTCString();

  const ifModifiedSince = request.headers.get('If-Modified-Since');
  if (ifModifiedSince && new Date(ifModifiedSince) >= new Date(lastModified)) {
    return new Response(null, { status: 304 });
  }

  if (
    !char.parsed_at ||
    Date.now() - char.parsed_at.getTime() > 1000 * 60 * 60
  ) {
    try {
      await updateProfile(params.id);
    } catch (error) {
      console.error('background refresh character failed:', error);
    }
  }

  if (!char.public) {
    char.deliveries = [];
    char.societies = [];
  }

  return Response.json(char, {
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
      'Last-Modified': lastModified,
    },
  });
};

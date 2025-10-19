import type { APIRoute } from 'astro';
import { characters, type Character } from '~/db/schema';
import { db } from '~/db/client';
import { eq } from 'drizzle-orm';

/**
 * PUT /characters/{id}/societies
 * @summary Update character's allied societies
 * @description Updates the reputation level and completion status for provided allied societies. This endpoint will also add new societies to the character if they are not already present. Requires an API key authentication.
 * @tag Characters
 * @pathParam {string} id - The Lodestone character identifier
 * @security apiKeyHeader - API key authentication
 * @bodyContent {SocietyEntry[]} application/json - An array of allied societies to update
 * @bodyRequired
 * @response 200 - Success
 * @responseContent {Response} 200.application/json
 * @response default - An error occurred
 * @responseContent {Response} default.application/json
 */
export const PUT: APIRoute = async ({ locals, params, url, request }) => {
  if (!locals.user) {
    return Response.json(
      { code: 401, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!params.id) {
    return Response.json(
      { code: 400, message: 'Bad request' },
      { status: 400 }
    );
  }

  const body = await request.json();
  const society = body as Character['societies'][number];

  if (!society.id || !society.reputation) {
    return Response.json(
      { code: 400, message: 'Bad request' },
      { status: 400 }
    );
  }

  const char = (await db
    .select()
    .from(characters)
    .where(eq(characters.id, params.id))
    .get()) as Character | undefined;

  if (!char) {
    return Response.json({ code: 404, message: 'Not found' }, { status: 404 });
  }

  await db
    .update(characters)
    .set({ societies: [...char.societies, society] })
    .where(eq(characters.id, params.id));

  return Response.json({ code: 200, message: 'Success' }, { status: 200 });
};

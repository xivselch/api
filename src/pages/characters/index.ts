import type { APIRoute } from 'astro';
import { lodestone } from '~/lib/hooks/lodestone';

/**
 * GET /characters
 * @summary Get characters by name
 * @description Gets Lodestone characters based on query parameters.
 * @tag Characters
 * @queryParam {string} name - The character name
 * @queryParam {string} [world_name] - The world name
 * @queryParam {string} [dc_name] - The datacenter name
 * @queryParam {string} [region] - The region name
 * @response 200 - Success
 * @responseContent {QueryCharacter[]} 200.application/json
 * @response default - An error occurred
 * @responseContent {Response} default.application/json
 */
export const GET: APIRoute = async ({ url }) => {
  const params = url.searchParams;

  const name = params.get('name');

  if (!name) {
    return Response.json(
      { code: 400, message: 'Bad request' },
      { status: 400 }
    );
  }

  // world > dc > region
  const world = params.get('world_name');
  const dc = params.getAll('dc_name')?.join(',');
  const region = params.getAll('region')?.join(',');

  const query = {
    q: name,
    worldname: world ? world : dc ? dc : region ? region : undefined,
  };

  const characters = await lodestone.getCharacter(query);

  return Response.json(characters, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=300, stale-while-revalidate=60',
    },
  });
};

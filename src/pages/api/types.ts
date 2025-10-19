import type { APIRoute } from 'astro';
import type { paths, components } from '~/lib/types/api';

// Type helpers for each endpoint
export type RouletteResponse =
  paths['/game/roulette']['get']['responses'][200]['content']['application/json'];
export type SocietiesResponse =
  paths['/game/societies']['get']['responses'][200]['content']['application/json'];
export type DeliveriesResponse =
  paths['/game/deliveries']['get']['responses'][200]['content']['application/json'];
export type CharactersResponse =
  paths['/characters']['get']['responses'][200]['content']['application/json'];
export type CharacterResponse =
  paths['/characters/{id}']['get']['responses'][200]['content']['application/json'];

// Component types
export type RouletteEntry = components['schemas']['RouletteEntry'];
export type Society = components['schemas']['Society'];
export type Delivery = components['schemas']['Delivery'];
export type Character = components['schemas']['Character'];
export type Patch = components['schemas']['Patch'];
export type Rank = components['schemas']['Rank'];
export type Error = components['schemas']['Error'];

// Parameter types
export type CharacterParams =
  paths['/characters/{id}']['get']['parameters']['path'];

// Example data for each endpoint
export const examples = {
  roulette: [
    {
      name: 'Expert',
      poetics: 0,
      uncapped: 60,
      capped: 40,
      gil: 7200,
      seals: 0,
      bonus: null,
    },
    {
      name: 'Level Cap Dungeons',
      poetics: 0,
      uncapped: 100,
      capped: 15,
      gil: 7200,
      seals: 0,
      bonus: null,
    },
  ] as RouletteEntry[],

  societies: [
    {
      name: "Amalj'aa",
      href: "https://ffxiv.consolegameswiki.com/wiki/Amalj'aa_Daily_Quests",
      patch: { name: 'A Realm Reborn', version: '2.1' },
      type: 'Battle',
      icon: 'https://v2.xivapi.com/api/asset?path=ui/icon/065000/065016_hr1.tex&format=png',
      ranks: [
        { name: 'Neutral', reputation: 0 },
        { name: 'Recognized', reputation: 300 },
      ],
      repPerQuest: [10, 14, 20],
    },
  ] as Society[],

  deliveries: [
    {
      name: 'Zhloe Aliapoh',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Zhloe_Aliapoh',
      icon: 'https://v2.xivapi.com/api/asset?path=ui/icon/061000/061661_hr1.tex&format=png',
      icon_alt: null,
      level: 55,
      patch: { name: 'Heavensward', version: '3.55a' },
    },
  ] as Delivery[],

  characters: [
    {
      id: '12345',
      name: 'Emet Selch',
    },
  ] as Character[],

  error: {
    error: 'Not Found',
    message: 'Character not found',
  } as Error,
};

// API route that serves TypeScript types and examples
export const GET: APIRoute = async ({ url }) => {
  const searchParams = new URL(url).searchParams;
  const format = searchParams.get('format') || 'json';

  if (format === 'typescript') {
    // Return TypeScript definitions as text
    const typesContent = `
// Generated API Types
export type RouletteResponse = ${JSON.stringify(examples.roulette, null, 2)};
export type SocietiesResponse = ${JSON.stringify(examples.societies, null, 2)};
export type DeliveriesResponse = ${JSON.stringify(examples.deliveries, null, 2)};
export type CharactersResponse = ${JSON.stringify(examples.characters, null, 2)};
export type CharacterResponse = ${JSON.stringify(examples.characters[0], null, 2)};

// Component types
export type RouletteEntry = {
  name: string;
  poetics: number;
  uncapped: number;
  capped: number;
  gil: number;
  seals: number;
  bonus: string | null;
};

export type Society = {
  name: string;
  href: string;
  patch: {
    name: string;
    version: string;
  };
  type: string | string[];
  icon: string;
  ranks: Array<{
    name: string;
    reputation: number;
  }>;
  repPerQuest: number[];
};

export type Delivery = {
  name: string;
  href: string;
  icon: string;
  icon_alt: string | string[] | null;
  level: number;
  patch: {
    name: string;
    version: string;
  };
};

export type Character = {
  id: string;
  name: string;
};

export type Error = {
  error: string;
  message: string;
};

// Examples
export const examples = ${JSON.stringify(examples, null, 2)};
`;

    return new Response(typesContent, {
      headers: {
        'Content-Type': 'text/typescript',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  // Default: return JSON with types and examples
  return Response.json(
    {
      types: {
        RouletteResponse: 'RouletteEntry[]',
        SocietiesResponse: 'Society[]',
        DeliveriesResponse: 'Delivery[]',
        CharactersResponse: 'Character[]',
        CharacterResponse: 'Character',
        RouletteEntry: 'RouletteEntry',
        Society: 'Society',
        Delivery: 'Delivery',
        Character: 'Character',
        Patch: 'Patch',
        Rank: 'Rank',
        Error: 'Error',
      },
      examples,
      endpoints: {
        '/game/roulette': {
          method: 'GET',
          response: 'RouletteResponse',
          example: examples.roulette,
        },
        '/game/societies': {
          method: 'GET',
          response: 'SocietiesResponse',
          example: examples.societies,
        },
        '/game/deliveries': {
          method: 'GET',
          response: 'DeliveriesResponse',
          example: examples.deliveries,
        },
        '/characters': {
          method: 'GET',
          response: 'CharactersResponse',
          example: examples.characters,
        },
        '/characters/{id}': {
          method: 'GET',
          response: 'CharacterResponse',
          example: examples.characters[0],
        },
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    }
  );
};

// Handle OPTIONS for CORS
export const OPTIONS: APIRoute = async () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};

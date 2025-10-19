import { Lodestone } from 'nodecollect';
import { characters } from '~/db/schema';
import { db } from '~/db/client';
import { eq } from 'drizzle-orm';

export const lodestone = new Lodestone();

export async function updateProfile(id: number | string) {
  if (typeof id === 'number') id = id.toString();

  let result: Partial<typeof characters.$inferSelect> | null =
    (await db.select().from(characters).where(eq(characters.id, id)).get()) ??
    null;

  const exists = !!result;
  if (!exists) {
    const data = await lodestone.getCharacter(id);
    if (!data) return null;

    result = {
      id: data.id.toString(),
      name: data.name,
      title: data.title,
      dc_name: data.dc_name,
      world_name: data.world_name,
      avatar: data.avatar,
      portrait: data.portrait,
      achievements: {
        total: data.achievements?.total ?? 0,
        score: data.achievements?.score ?? 0,
      },
      minions: data.minions,
      mounts: data.mounts,
      facewear: data.facewear,
      deliveries: [],
      societies: [],
    };
  }

  result!.score =
    ((result!.achievements as any)?.total ?? 0) * 5 +
    ((result!.minions as any) ?? 0) * 5 +
    ((result!.mounts as any) ?? 0) * 5 +
    ((result!.facewear as any) ?? 0) * 5 +
    ((result!.deliveries as any)?.length ?? 0) * 5 +
    ((result!.societies as any)?.length ?? 0) * 5;

  if (!result || !result.id) return null;

  result.parsed_at = new Date();

  if (exists) {
    await db.update(characters).set(result).where(eq(characters.id, id));
  } else {
    await db
      .insert(characters)
      .values([result as typeof characters.$inferInsert]);
  }

  return result;
}

import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const characters = sqliteTable('characters', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  title: text('title').notNull(),
  dc_name: text('dc_name').notNull(),
  world_name: text('world_name').notNull(),
  avatar: text('avatar'),
  portrait: text('portrait'),
  score: integer('score').default(0),
  achievements: text('achievements', { mode: 'json' }).default({
    total: 0,
    score: 0,
  }),
  minions: integer('minions').default(0),
  mounts: integer('mounts').default(0),
  facewear: integer('facewear').default(0),
  deliveries: text('deliveries', { mode: 'json' }).default([]),
  societies: text('societies', { mode: 'json' }).default([]),
  public: integer('public', { mode: 'boolean' }).default(false),
  parsed_at: integer('parsed_at', { mode: 'timestamp' })
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export type Character = typeof characters.$inferSelect & {
  deliveries: { id: number; satisfaction: number; completed: boolean }[];
  societies: {
    id: number;
    rank: string;
    reputation: number;
    completed: boolean;
  }[];
};

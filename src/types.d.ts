export interface RouletteEntry {
  name: string;
  poetics: number;
  uncapped: number;
  capped: number;
  gil: number;
  seals: number;
  bonus: string | null;
}

export interface DeliveryEntry {
  id: number;
  /**
   * @default 0
   */
  satisfaction: number;
  /**
   * @default false
   */
  completed: boolean;
}

export interface SocietyEntry {
  id: number;
  /**
   * @default "None"
   */
  rank: string;
  /**
   * @default 0
   */
  reputation: number;
  /**
   * @default false
   */
  completed: boolean;
}

export interface QueryCharacter {
  id: string;
  name: string;
  dc_name: string;
  world_name: string;
  avatar: string;
  grand_company: {
    name: string;
    title: number;
  } | null;
}

export interface Character extends QueryCharacter {
  title: string;
  portrait: string | null;
  /**
   * @default 0
   */
  score: number;
  achievements: {
    /**
     * @default 0
     */
    total: number;
    /**
     * @default 0
     */
    score: number;
  } | null;
  /**
   * @default 0
   */
  minions: number | null;
  /**
   * @default 0
   */
  mounts: number | null;
  /**
   * @default 0
   */
  facewear: number | null;
  /**
   * @default []
   */
  deliveries: DeliveryEntry[];
  /**
   * @default []
   */
  societies: SocietyEntry[];
  /**
   * @default false
   */
  public: boolean;
  parsed_at: Date;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  image?: string | null;
}

export interface Response {
  code: number;
  message: string;
}

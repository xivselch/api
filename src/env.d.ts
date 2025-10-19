/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    user:
      | (import('better-auth').User & {
          characterIds: string[];
          username: string;
        })
      | null;
    session: import('better-auth').Session | null;
  }
}

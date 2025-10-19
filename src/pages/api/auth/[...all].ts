import type { APIRoute } from 'astro';
import { auth } from '~/auth';

// please don't change this file
export const ALL: APIRoute = async ctx => {
  ctx.request.headers.set('x-forwarded-for', ctx.clientAddress);
  return auth.handler(ctx.request);
};

import { defineMiddleware } from 'astro:middleware';
import { auth } from '~/auth';

export const onRequest = defineMiddleware(
  async ({ locals, request, url, redirect }, next) => {
    locals.user = null;
    locals.session = null;

    const data = await auth.api.getSession({ headers: request.headers });
    if (!data) return next();

    const { session, user } = data;

    locals.user = user;
    locals.session = session;

    return next();
  }
);

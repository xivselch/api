# Contributing

Want to add an API endpoint or update the docs? It's quick:

1. **Document with JSDoc**:  
   Just add a JSDoc comment above your new endpoint.

   ```ts
   /**
    * GET /users
    * @summary List all users
    * @response 200 - Array of users
    * @responseContent {User[]} 200.application/json
    */
   export const GET = async () => {
     return Response.json([
       { id: '1', name: 'John Doe' },
       { id: '2', name: 'Jane Smith' },
     ]);
   };
   ```

   If your endpoint requires a new data type, just add the typings into [`~/types`](/src/types.d.ts)

1. **Update the docs:**  
   Run:
   ```bash
   yarn docs:build  # Or use npm, pnpm, or bun
   ```
   Docs output will update at [`/openapi.yml`](http://localhost:4321/openapi.yml) and [`/openapi.json`](http://localhost:4321/openapi.json).

That's it! For more advanced usage — parameters, request bodies, error codes, authentication, etc — see:

- [swagger-jsdoc](https://github.com/Surnet/swagger-jsdoc)
- [openapi-comment-parser](https://github.com/bee-travels/openapi-comment-parser)

Or check other endpoints and schemas in the repo for examples.

import ocParser from 'openapi-comment-parser';
import tsj from 'ts-json-schema-generator';
import fs from 'fs';
import path from 'path';
import yaml from 'yaml';
import chalk from 'chalk';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(chalk.yellow('Parsing JSDoc comments from source files...'));

const pkg = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8')
);
const baseSpec = yaml.parse(
  fs.readFileSync(path.resolve(__dirname, 'openapi.yml'), 'utf-8')
);

baseSpec.info.version = pkg.version;

const commentSpec = ocParser({
  cwd: path.resolve(process.cwd()),
  extension: ['.js', '.cjs', '.mjs', '.ts', '.tsx', '.jsx'],
  include: ['src/pages/**/*.ts', 'src/lib/**/*.ts'],
  exclude: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/*.test.*',
    '**/*.spec.*',
    '**/docs/**',
  ],
});

console.log(chalk.yellow('Parsing schema from typings...'));
const schema = tsj
  .createGenerator({
    path: path.resolve(__dirname, '../src/types.d.ts'),
    tsconfigPath: path.resolve(__dirname, '../tsconfig.json'),
    type: '*',
  })
  .createSchema('*').definitions;

const replaceRefs = obj => {
  Object.keys(obj).forEach(key => {
    if (obj[key].$ref) {
      obj[key].$ref = obj[key].$ref.replace(
        /^#\/definitions\//,
        '#/components/schemas/'
      );
    }

    if (typeof obj[key] === 'object') replaceRefs(obj[key]);
  });
};

replaceRefs(schema);

const mergedYml = {
  ...baseSpec,
  paths: { ...baseSpec.paths, ...commentSpec.paths },
  components: {
    ...baseSpec.components,
    schemas: {
      ...baseSpec.components?.schemas,
      ...schema,
    },
  },
};

const publicDir = path.resolve(process.cwd(), 'public');
if (fs.existsSync(publicDir)) {
  const output = yaml.stringify(mergedYml, { indent: 2, lineWidth: 120 });
  fs.writeFileSync(path.join(publicDir, 'openapi.yml'), output);
  console.log(chalk.blue(`YML Output:`), path.join(publicDir, 'openapi.yml'));
}

console.log();
console.log(chalk.green('OpenAPI specs generated successfully!'));

export default mergedYml;

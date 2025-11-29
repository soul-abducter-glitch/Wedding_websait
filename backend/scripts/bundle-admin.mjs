import path from 'path';
import fs from 'fs/promises';
import { bundle } from '@adminjs/bundler';
import { ComponentLoader } from 'adminjs';
import { existsSync } from 'fs';

// Recreate component loader setup (same logic as src/admin/component-loader.ts but inline for bundling).
const componentLoader = new ComponentLoader();

const resolveUploadComponentsDir = () => {
  // Try local compiled components (if any)
  const local = path.join(process.cwd(), 'src', 'admin', 'components');
  if (existsSync(local)) return local;

  // Try node_modules layout
  const candidate = path.join(
    process.cwd(),
    'node_modules',
    '@adminjs',
    'upload',
    'build',
    'features',
    'upload-file',
    'components',
  );
  if (existsSync(candidate)) return candidate;

  throw new Error('Cannot resolve @adminjs/upload components directory for bundling');
};

const uploadComponentsDir = resolveUploadComponentsDir();

componentLoader.add('UploadEditComponent', path.join(uploadComponentsDir, 'UploadEditComponent.js'));
componentLoader.add('UploadListComponent', path.join(uploadComponentsDir, 'UploadListComponent.js'));
componentLoader.add('UploadShowComponent', path.join(uploadComponentsDir, 'UploadShowComponent.js'));

const destinationDir = path.join('public', 'admin');
await fs.mkdir(path.join(process.cwd(), destinationDir), { recursive: true });

await bundle({
  adminJsOptions: {
    rootPath: '/admin',
    componentLoader,
  },
  destinationDir,
});

console.log(`AdminJS assets bundled to ${destinationDir}`);

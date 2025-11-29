import { ComponentLoader } from 'adminjs';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Single ComponentLoader shared across AdminJS instance and bundler
export const componentLoader = new ComponentLoader();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Resolve @adminjs/upload bundled components without relying on cwd or package exports
const resolveUploadComponentsDir = () => {
  // Try bundled (our sources) first
  const bundled = path.join(__dirname, 'components');
  if (existsSync(bundled)) return bundled;
  // Then try package assets (node_modules)
  try {
    const uploadEntryUrl = new URL(import.meta.resolve('@adminjs/upload'));
    return fileURLToPath(new URL('./features/upload-file/components/', uploadEntryUrl));
  } catch {
    // ignore
  }
  let dir = __dirname;
  while (true) {
    const candidate = path.join(
      dir,
      'node_modules',
      '@adminjs',
      'upload',
      'build',
      'features',
      'upload-file',
      'components',
    );
    if (existsSync(candidate)) return candidate;
    const parent = path.dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  throw new Error('Cannot find @adminjs/upload components directory');
};

const uploadComponentsDir = resolveUploadComponentsDir();

export const Components = {
  UploadEdit: componentLoader.add(
    'UploadEditComponent',
    path.join(uploadComponentsDir, 'UploadEditComponent.js'),
  ),
  UploadList: componentLoader.add(
    'UploadListComponent',
    path.join(uploadComponentsDir, 'UploadListComponent.js'),
  ),
  UploadShow: componentLoader.add(
    'UploadShowComponent',
    path.join(uploadComponentsDir, 'UploadShowComponent.js'),
  ),
};

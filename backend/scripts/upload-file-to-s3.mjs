#!/usr/bin/env node
/**
 * Simple CLI uploader to S3/compatible storage.
 *
 * Usage:
 *   node scripts/upload-file-to-s3.mjs /path/to/file.jpg folder/subfolder
 *
 * Required env:
 *   S3_BUCKET
 *   S3_REGION
 *   S3_ACCESS_KEY_ID
 *   S3_SECRET_ACCESS_KEY
 * Optional:
 *   S3_ENDPOINT (for MinIO/Render/Railway object storage)
 *   S3_PUBLIC_BASE_URL (override URL prefix for public access; otherwise uses endpoint/bucket)
 */
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { nanoid } from 'nanoid';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const requiredEnv = ['S3_BUCKET', 'S3_REGION', 'S3_ACCESS_KEY_ID', 'S3_SECRET_ACCESS_KEY'];
for (const key of requiredEnv) {
  if (!process.env[key]) {
    console.error(`Missing env: ${key}`);
    process.exit(1);
  }
}

const [,, filePath, targetFolder = 'uploads'] = process.argv;
if (!filePath) {
  console.error('Usage: node scripts/upload-file-to-s3.mjs /path/to/file.jpg folder/subfolder');
  process.exit(1);
}

const bucket = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const endpoint = process.env.S3_ENDPOINT;
const publicBase = process.env.S3_PUBLIC_BASE_URL;

const s3 = new S3Client({
  region,
  endpoint,
  forcePathStyle: Boolean(endpoint),
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const run = async () => {
  const absPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
  const buf = await readFile(absPath);
  const ext = path.extname(absPath) || '';
  const name = `${Date.now()}-${nanoid(8)}${ext}`;
  const key = `${targetFolder.replace(/\\/g, '/')}/${name}`.replace(/\/+/g, '/');

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buf,
      ACL: 'public-read',
    }),
  );

  const url = publicBase
    ? `${publicBase.replace(/\/$/, '')}/${key}`
    : endpoint
      ? `${endpoint.replace(/\/$/, '')}/${bucket}/${key}`
      : `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

  console.log('Uploaded to:', url);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

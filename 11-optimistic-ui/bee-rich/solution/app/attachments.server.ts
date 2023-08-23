import type { UploadHandler } from '@remix-run/node';
import {
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
} from '@remix-run/node';
import fs from 'fs';
import path from 'path';

const standardFileUploadHandler = unstable_createFileUploadHandler({
  directory: './attachments',
  avoidFileConflicts: true,
});

const attachmentsUploadHandler: UploadHandler = async (args) => {
  if (args.name !== 'attachment' || !args.filename) return null;
  const file = await standardFileUploadHandler(args);
  if (!file) return null;
  if (typeof file === 'string') return file;
  return file.name;
};

export const uploadHandler = unstable_composeUploadHandlers(
  attachmentsUploadHandler,
  unstable_createMemoryUploadHandler(),
);

export function deleteAttachment(fileName: string) {
  const localPath = path.join(process.cwd(), 'attachments', fileName);
  try {
    fs.unlinkSync(localPath);
  } catch (error) {
    console.error(error);
  }
}

export function buildFileResponse(fileName: string): Response {
  const localPath = path.join(process.cwd(), 'attachments', fileName);
  try {
    const file = fs.readFileSync(localPath);
    return new Response(file, {
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error(error);
    return new Response('Not Found', { status: 404 });
  }
}

import { promises as fs } from 'fs';
import path from 'path';

const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

/**
 * Ensure upload directory exists
 */
export async function ensureUploadDir(): Promise<void> {
  try {
    await fs.access(UPLOAD_DIR);
  } catch {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Save video file to storage
 */
export async function saveVideoFile(
  buffer: Buffer,
  filename: string
): Promise<string> {
  await ensureUploadDir();
  
  const filepath = path.join(UPLOAD_DIR, filename);
  await fs.writeFile(filepath, buffer);
  
  return `/uploads/${filename}`;
}

/**
 * Delete video file from storage
 */
export async function deleteVideoFile(filename: string): Promise<void> {
  const filepath = path.join(UPLOAD_DIR, filename);
  
  try {
    await fs.unlink(filepath);
  } catch (error) {
    console.error('Failed to delete file:', error);
  }
}

/**
 * Check if file exists
 */
export async function fileExists(filename: string): Promise<boolean> {
  const filepath = path.join(UPLOAD_DIR, filename);
  
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

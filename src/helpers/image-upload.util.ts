import { HttpException, HttpStatus } from '@nestjs/common';
import sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

export async function sharpImageToWebP(
  image: Express.Multer.File,
  height: number,
  width: number,
  photoPath: string,
): Promise<string> {
  try {
    if (!fs.existsSync(photoPath)) {
      fs.mkdirSync(photoPath, { recursive: true });
    }

    const uniqueName = `${uuidv4()}.webp`;
    const outputPath = `${photoPath}/${uniqueName}`;

    await sharp(image.buffer)
      .rotate() // auto-rotate based on EXIF
      .resize({
        width,
        height,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 75,        // best balance
        effort: 6,          // compression effort (0–6)
        smartSubsample: true,
      })
      .toFile(outputPath);

    return uniqueName;
  } catch (error) {
    throw new HttpException(
      error?.message || 'Image processing failed',
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

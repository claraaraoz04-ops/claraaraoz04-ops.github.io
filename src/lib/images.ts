import type { ImageMetadata } from 'astro';

// Todas las imágenes de src/assets/images/ se importan aquí para que Astro
// las optimice (WebP + tamaños responsive) al compilar.
const files = import.meta.glob<{ default: ImageMetadata }>(
  '/src/assets/images/**/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true },
);

/** Devuelve la imagen optimizable o `undefined` si el archivo no existe. */
export function findImage(src: string): ImageMetadata | undefined {
  return files[`/src/assets/images/${src.replace(/^\/+/, '')}`]?.default;
}

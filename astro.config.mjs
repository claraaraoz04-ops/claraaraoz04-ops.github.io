// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Dirección pública de la web (se usa para las URLs canónicas y Open Graph).
  // Si algún día usas un dominio propio, cámbialo aquí.
  site: 'https://claraaraoz04-ops.github.io',
  trailingSlash: 'always',
  build: { format: 'directory' },
});

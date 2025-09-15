/**
 * Gera a URL absoluta de uma imagem baseada no backend
 * - Se for uma URL completa, retorna como está
 * - Se for um caminho relativo, prefixa com BACKEND_URL
 */
export function getImageUrl(path: string | undefined | null): string | undefined {
  if (!path) return undefined;

  // Se já for uma URL completa
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // Prefixo do backend (via env)
  const baseUrl = import.meta.env.VITE_BACKEND_URL;

  if (!baseUrl) {
    console.warn('VITE_BACKEND_URL não está definido.');
    return path;
  }

  return `${baseUrl}${path}`;
}

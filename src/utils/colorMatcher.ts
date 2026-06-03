import { getPaletteSync } from 'colorthief';
import type { UnsplashImage } from '../api/unsplashApi';

type RGB = [number, number, number];

function hexToRgb(hex: string): RGB {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}

function rgbDistance(a: RGB, b: RGB): number {
  return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

const LOAD_TIMEOUT_MS = 1500;

function loadCors(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    const timer = setTimeout(() => reject(new Error('timeout')), LOAD_TIMEOUT_MS);
    img.onload = () => { clearTimeout(timer); resolve(img); };
    img.onerror = () => { clearTimeout(timer); reject(new Error('load failed')); };
    img.src = src;
  });
}

async function extractPalette(src: string): Promise<RGB[]> {
  try {
    const img = await loadCors(src);
    // colorthief v3: getPaletteSync(BrowserSource, options) → Color[] | null
    const colors = getPaletteSync(img, { colorCount: 3 });
    if (!colors) return [];
    // Color 객체의 .hex()로 HEX 추출 → RGB 변환
    return colors.map((c) => hexToRgb(c.hex()));
  } catch {
    return [];
  }
}

function minDistance(palette: RGB[], imageColors: RGB[]): number {
  if (imageColors.length === 0) return Infinity;
  let min = Infinity;
  for (const p of palette) {
    for (const c of imageColors) {
      const d = rgbDistance(p, c);
      if (d < min) min = d;
    }
  }
  return min;
}

export async function selectMatchingImages(
  images: UnsplashImage[],
  paletteHexes: string[],
  topN = 6,
  onProgress?: (done: number, total: number) => void,
): Promise<UnsplashImage[]> {
  if (paletteHexes.length === 0) return images.slice(0, topN);

  const palette = paletteHexes.map(hexToRgb);
  let done = 0;

  const results = await Promise.allSettled(
    images.map(async (img) => {
      // 색상 분석은 thumb(200px)로 — small(400px) 대비 3~4배 빠름
      const colors = await extractPalette(img.urls.thumb);
      const score = minDistance(palette, colors);
      onProgress?.(++done, images.length);
      return { img, score };
    }),
  );

  return results
    .filter(
      (r): r is PromiseFulfilledResult<{ img: UnsplashImage; score: number }> =>
        r.status === 'fulfilled' && r.value.score < Infinity,
    )
    .map((r) => r.value)
    .sort((a, b) => a.score - b.score)
    .slice(0, topN)
    .map((s) => s.img);
}

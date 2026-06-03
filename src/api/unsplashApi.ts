export interface UnsplashImage {
  id: string;
  urls: {
    regular: string;
    small: string;
    thumb: string;
  };
  links: {
    html: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
}

export async function fetchUnsplashImages(keywords: string): Promise<UnsplashImage[]> {
  const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY as string;
  if (!accessKey) throw new Error('Unsplash API 키가 설정되지 않았습니다.');

  const query = encodeURIComponent(keywords);
  const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=12&orientation=squarish`;

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` },
  });

  if (!res.ok) {
    throw new Error(`Unsplash 오류: ${res.status}`);
  }

  const json = await res.json() as { results: UnsplashImage[] };
  return json.results;
}

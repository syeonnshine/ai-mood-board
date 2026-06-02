import { useState, useEffect } from 'react';
import { fetchUnsplashImages } from '../api/unsplashApi';
import { selectMatchingImages } from '../utils/colorMatcher';
import type { UnsplashImage } from '../api/unsplashApi';

interface ImageGridProps {
  keywords: string;
  paletteHexes: string[];
}

function SkeletonCard() {
  return <div className="aspect-square rounded-lg bg-stone-200 animate-pulse" />;
}

export default function ImageGrid({ keywords, paletteHexes }: ImageGridProps) {
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState('이미지 검색 중...');
  const [error, setError] = useState<string | null>(null);

  // paletteHexes 배열 참조가 매 렌더마다 바뀌므로 문자열로 비교
  const paletteKey = paletteHexes.join(',');

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      setImages([]);
      setProgress('이미지 검색 중...');

      try {
        const all = await fetchUnsplashImages(keywords);
        if (cancelled) return;

        if (all.length === 0) {
          setLoading(false);
          return;
        }

        setProgress(`색상 분석 중 0/${all.length}`);

        const matched = await selectMatchingImages(
          all,
          paletteHexes,
          6,
          (done, total) => {
            if (!cancelled) setProgress(`색상 분석 중 ${done}/${total}`);
          },
        );

        if (!cancelled) {
          setImages(matched);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.');
          setLoading(false);
        }
      }
    }

    run();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keywords, paletteKey]);

  return (
    <section className="bg-[#FAFAF9] rounded-lg border border-stone-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] font-medium text-zinc-400 tracking-widest uppercase">
          Image Inspiration
        </h2>
        {!loading && !error && images.length > 0 && (
          <span className="text-[11px] text-zinc-300">Powered by Unsplash</span>
        )}
      </div>

      {error ? (
        <div className="bg-red-50 border border-red-100 rounded-lg px-4 py-3 text-sm text-red-500 text-center">
          {error}
        </div>
      ) : !loading && images.length === 0 ? (
        <p className="text-sm text-zinc-400 py-4 text-center">검색 결과가 없습니다.</p>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-2">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : images.map((img) => (
                  <a
                    key={img.id}
                    href={img.links.html}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square overflow-hidden rounded-lg block"
                    title={img.alt_description ?? img.user.name}
                  >
                    <img
                      src={img.urls.small}
                      crossOrigin="anonymous"
                      alt={img.alt_description ?? ''}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                    <p className="absolute bottom-0 left-0 right-0 px-2 py-1.5 text-[10px] text-white/90 truncate translate-y-full group-hover:translate-y-0 transition-transform duration-200 bg-gradient-to-t from-black/60 to-transparent">
                      {img.user.name}
                    </p>
                  </a>
                ))}
          </div>

          {loading && (
            <p className="text-[11px] text-zinc-400 mt-3 text-center">{progress}</p>
          )}
        </>
      )}
    </section>
  );
}

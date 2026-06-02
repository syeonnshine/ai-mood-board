import { useEffect } from 'react';
import type { FontCombination as FontCombinationType } from '../types/moodboard';
import { IconType } from './Icons';

interface FontCombinationProps {
  combinations: FontCombinationType[];
}

function loadGoogleFonts(fonts: string[]): void {
  const uniqueFonts = [...new Set(fonts)];
  const fontQuery = uniqueFonts.map((f) => f.replace(/\s+/g, '+')).join('&family=');
  const existingLink = document.getElementById('dynamic-google-fonts');
  if (existingLink) existingLink.remove();
  const link = document.createElement('link');
  link.id = 'dynamic-google-fonts';
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?family=${fontQuery}:wght@400;600;700&display=swap`;
  document.head.appendChild(link);
}

export default function FontCombination({ combinations }: FontCombinationProps) {
  useEffect(() => {
    loadGoogleFonts(combinations.flatMap((c) => [c.heading, c.body]));
  }, [combinations]);

  return (
    <section className="bg-white rounded-lg border border-stone-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <IconType size={20} className="text-zinc-500" strokeWidth={1.5} />
        <h2 className="text-xl font-bold text-zinc-900">폰트 조합</h2>
      </div>

      <div className="space-y-4">
        {combinations.map((combo, i) => (
          <div
            key={i}
            className="bg-stone-50 border border-stone-200 rounded-md p-5 hover:border-zinc-400 transition-colors"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-zinc-400 flex-shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className="text-xs text-zinc-500">{combo.description}</p>
            </div>

            <div className="space-y-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">제목</span>
                  <span className="text-xs text-zinc-400 font-mono">{combo.heading}</span>
                </div>
                <p className="text-2xl text-zinc-900 leading-tight" style={{ fontFamily: `'${combo.heading}', serif` }}>
                  Beautiful Moodboard Design
                </p>
              </div>

              <div className="border-t border-stone-200" />

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-zinc-400 uppercase tracking-wide">본문</span>
                  <span className="text-xs text-zinc-400 font-mono">{combo.body}</span>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed" style={{ fontFamily: `'${combo.body}', sans-serif` }}>
                  디자인은 단순히 사물의 외관이 아니라, 어떻게 작동하는지에 관한 것입니다.
                  좋은 타이포그래피는 가독성을 높이고 브랜드의 성격을 전달합니다.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

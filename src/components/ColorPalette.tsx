import { useState } from 'react';
import type { Color } from '../types/moodboard';

interface ColorPaletteProps {
  colors: Color[];
}

/** 배경색 밝기로 텍스트 색(흰/검) 결정 */
function isLight(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.55;
}

export default function ColorPalette({ colors }: ColorPaletteProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      setTimeout(() => setCopiedHex(null), 1500);
    } catch {}
  };

  return (
    <section className="bg-[#FAFAF9] rounded-lg border border-stone-200 p-5">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[11px] font-medium text-zinc-400 tracking-widest uppercase">
          Color Palette
        </h2>
        <span className="text-[11px] text-zinc-300 font-normal">click to copy</span>
      </div>

      {/* 가로 스트립 */}
      <div className="flex h-10 rounded-sm overflow-hidden mb-4">
        {colors.map((color, i) => (
          <div
            key={i}
            className="flex-1 cursor-pointer transition-all hover:brightness-95"
            style={{ backgroundColor: color.hex }}
            onClick={() => handleCopy(color.hex)}
          />
        ))}
      </div>

      {/* 세로 색상 카드 */}
      <div className="grid grid-cols-5 gap-2">
        {colors.map((color, i) => {
          const isCopied = copiedHex === color.hex;
          const light = isLight(color.hex);

          return (
            <div
              key={i}
              className="group cursor-pointer"
              onClick={() => handleCopy(color.hex)}
            >
              {/* 색상 직사각형 */}
              <div
                className="w-full h-40 rounded-sm relative overflow-hidden mb-2.5"
                style={{ backgroundColor: color.hex }}
              >
                {/* 호버 + 복사 시 어두워지는 오버레이 */}
                <div
                  className={`absolute inset-0 bg-black transition-opacity duration-200 ${
                    isCopied
                      ? 'opacity-[0.18]'
                      : 'opacity-0 group-hover:opacity-[0.06]'
                  }`}
                />

                {/* 복사 완료 표시 */}
                {isCopied && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-xs font-medium tracking-wide ${
                        light ? 'text-black/60' : 'text-white/80'
                      }`}
                    >
                      ✓
                    </span>
                  </div>
                )}
              </div>

              {/* 이름 + HEX */}
              <p className="text-xs font-medium text-zinc-700 truncate leading-snug">
                {color.name}
              </p>
              <p className="text-[10px] font-normal text-zinc-400 font-mono mt-0.5 uppercase tracking-wide">
                {color.hex}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

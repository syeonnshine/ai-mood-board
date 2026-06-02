import type { MoodboardData } from '../types/moodboard';
import ColorPalette from './ColorPalette';
import FontCombination from './FontCombination';
import MoodKeywords from './MoodKeywords';
import { IconPalette } from './Icons';

interface MoodboardResultProps {
  data: MoodboardData;
  keywords: string;
}

export default function MoodboardResult({ data, keywords }: MoodboardResultProps) {
  return (
    <div className="w-full animate-fade-in">
      {/* 결과 헤더 */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-200">
        <IconPalette size={20} className="text-zinc-500 flex-shrink-0" strokeWidth={1.5} />
        <div>
          <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium">생성된 무드보드</p>
          <h3 className="font-bold text-zinc-900 text-lg leading-tight">"{keywords}"</h3>
        </div>

        <div className="ml-auto flex gap-1">
          {data.colorPalette.slice(0, 5).map((color, i) => (
            <div
              key={i}
              className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>
      </div>

      <div className="space-y-5">
        <ColorPalette colors={data.colorPalette} />
        <FontCombination combinations={data.fontCombinations} />
        <MoodKeywords keywords={data.moodKeywords} overallMood={data.overallMood} />
      </div>
    </div>
  );
}

import { IconTag, IconNote } from './Icons';

/** 키워드 태그 색상 — 모두 무채색/베이지 톤 */
const TAG_COLORS = [
  'bg-stone-100 text-zinc-700 border-stone-200',
  'bg-zinc-100 text-zinc-600 border-zinc-200',
  'bg-stone-200 text-zinc-800 border-stone-300',
  'bg-white text-zinc-600 border-stone-200',
  'bg-[#2C4A2E] text-white border-[#2C4A2E]',
  'bg-stone-100 text-zinc-700 border-stone-200',
  'bg-zinc-200 text-zinc-700 border-zinc-300',
  'bg-white text-zinc-500 border-stone-300',
];

interface MoodKeywordsProps {
  keywords: string[];
  overallMood: string;
}

export default function MoodKeywords({ keywords, overallMood }: MoodKeywordsProps) {
  return (
    <section className="bg-white rounded-lg border border-stone-200 p-6">
      <div className="flex items-center gap-2 mb-5">
        <IconTag size={20} className="text-zinc-500" strokeWidth={1.5} />
        <h2 className="text-xl font-bold text-zinc-900">분위기 키워드</h2>
        <span className="ml-auto text-xs bg-stone-100 text-zinc-400 px-2 py-0.5 rounded-full">
          {keywords.length}개
        </span>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {keywords.map((keyword, i) => (
          <span
            key={i}
            className={`px-3 py-1.5 rounded-full text-sm font-medium border ${
              TAG_COLORS[i % TAG_COLORS.length]
            } transition-transform hover:scale-105 cursor-default`}
          >
            {keyword}
          </span>
        ))}
      </div>

      {/* 전체 무드 설명 */}
      <div className="bg-stone-50 border border-stone-200 rounded-md p-4">
        <div className="flex items-start gap-3">
          <IconNote size={16} className="text-zinc-400 mt-0.5 flex-shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-xs font-semibold text-zinc-500 mb-1 uppercase tracking-widest">전체 무드</p>
            <p className="text-sm text-zinc-700 leading-relaxed">{overallMood}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

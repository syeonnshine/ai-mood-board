import { useState } from 'react';
import { IconSparkle } from './Icons';

interface KeywordInputProps {
  onGenerate: (keywords: string) => void;
  isLoading: boolean;
}

const EXAMPLE_KEYWORDS = [
  '미니멀 & 북유럽 스타일',
  '레트로 80년대 팝아트',
  '자연 & 에코 라이프스타일',
  '럭셔리 다크 모던',
  '봄날의 체리블라썸',
  '사이버펑크 도시',
  '코티지코어 & 빈티지',
  '오션 & 비치 바이브',
];

export default function KeywordInput({ onGenerate, isLoading }: KeywordInputProps) {
  const [keywords, setKeywords] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keywords.trim() && !isLoading) onGenerate(keywords.trim());
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          placeholder="키워드를 입력하세요 (예: 미니멀 모던 인테리어)"
          disabled={isLoading}
          className="flex-1 bg-white border border-stone-300 rounded-xl px-5 py-4 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-[#2C4A2E] focus:ring-2 focus:ring-[#2C4A2E]/10 transition-all text-base disabled:bg-stone-50 disabled:cursor-not-allowed"
        />
        <button
          type="submit"
          disabled={!keywords.trim() || isLoading}
          className="bg-[#2C4A2E] text-white font-medium px-6 py-4 rounded-xl hover:bg-[#243e25] disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {isLoading ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              생성 중...
            </>
          ) : (
            <><IconSparkle size={15} strokeWidth={1.5} /> 생성하기</>
          )}
        </button>
      </form>

      <div className="mt-4">
        <p className="text-zinc-400 text-xs mb-2 ml-1">예시 키워드:</p>
        <div className="flex flex-wrap gap-2">
          {EXAMPLE_KEYWORDS.map((example) => (
            <button
              key={example}
              onClick={() => setKeywords(example)}
              disabled={isLoading}
              className="text-xs bg-white border border-stone-200 text-zinc-500 px-3 py-1.5 rounded-full hover:border-zinc-400 hover:text-zinc-700 hover:bg-stone-50 transition-all disabled:cursor-not-allowed disabled:opacity-50"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

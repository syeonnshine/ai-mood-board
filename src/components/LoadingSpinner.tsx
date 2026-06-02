import { IconWand } from './Icons';

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-stone-200" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#2C4A2E] animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-[#2C4A2E]/40 animate-spin [animation-direction:reverse] [animation-duration:0.8s]" />
        <div className="absolute inset-0 flex items-center justify-center text-zinc-500">
          <IconWand size={22} strokeWidth={1.4} />
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-zinc-700 font-semibold text-lg">무드보드 생성 중...</p>
        <p className="text-zinc-400 text-sm">Claude AI가 당신만의 무드를 분석하고 있어요</p>
      </div>

      <div className="flex gap-2">
        {['색상 팔레트', '폰트 조합', '키워드'].map((step, i) => (
          <div
            key={step}
            className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-full px-3 py-1"
          >
            <span
              className="w-2 h-2 rounded-full bg-[#2C4A2E]/50 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
            <span className="text-xs text-zinc-500">{step}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

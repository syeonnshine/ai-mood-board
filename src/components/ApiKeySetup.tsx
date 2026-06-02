import { useState } from 'react';
import { IconKey, IconInfo } from './Icons';

interface ApiKeySetupProps {
  onSave: (apiKey: string) => void;
}

/**
 * API 키 입력 컴포넌트
 * VITE_ANTHROPIC_API_KEY 환경변수가 없을 때 표시됩니다.
 */
export default function ApiKeySetup({ onSave }: ApiKeySetupProps) {
  const [key, setKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (key.trim()) {
      onSave(key.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center p-4">
      <div className="bg-white border border-stone-200 rounded-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2C4A2E]/10 rounded-2xl mb-4 text-[#2C4A2E]">
            <IconKey size={26} strokeWidth={1.4} />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 mb-2">API 키 설정</h2>
          <p className="text-zinc-500 text-sm">
            Anthropic API 키를 입력하여 무드보드 생성기를 시작하세요
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-zinc-700 text-sm font-medium mb-2">
              Anthropic API 키
            </label>
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-ant-api03-..."
                className="w-full bg-white border border-stone-300 rounded-xl px-4 py-3 text-zinc-800 placeholder-zinc-300 focus:outline-none focus:border-[#2C4A2E] focus:ring-2 focus:ring-[#2C4A2E]/10 transition-all pr-12 text-sm"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors text-xs"
              >
                {showKey ? '숨기기' : '표시'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={!key.trim()}
            className="w-full bg-[#2C4A2E] text-white font-medium py-3 rounded-xl hover:bg-[#243e25] disabled:opacity-30 disabled:cursor-not-allowed transition-all text-sm"
          >
            시작하기
          </button>
        </form>

        <div className="mt-5 p-4 bg-stone-50 rounded-xl border border-stone-200 flex gap-3">
          <IconInfo size={15} className="text-zinc-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
          <p className="text-zinc-500 text-xs leading-relaxed">
            <strong className="text-zinc-600">.env 파일 사용:</strong>{' '}
            프로젝트 루트에 <code className="bg-stone-200 px-1 rounded font-mono">.env</code> 파일을 생성하고{' '}
            <code className="bg-stone-200 px-1 rounded font-mono">VITE_ANTHROPIC_API_KEY=your_key</code>를 추가하면
            자동으로 불러옵니다.
          </p>
        </div>

        <p className="text-center text-zinc-400 text-xs mt-4">
          API 키는 브라우저 세션에만 저장되며 서버로 전송되지 않습니다
        </p>
      </div>
    </div>
  );
}

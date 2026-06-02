import { useState, useCallback } from 'react';
import type { MoodboardData, ApiStatus } from './types/moodboard';
import { generateMoodboard } from './api/claudeApi';
import ApiKeySetup from './components/ApiKeySetup';
import KeywordInput from './components/KeywordInput';
import LoadingSpinner from './components/LoadingSpinner';
import MoodboardResult from './components/MoodboardResult';
import Logo from './components/Logo';
import { IconWarning, IconCanvas, IconKey } from './components/Icons';

export default function App() {
  const [apiKey, setApiKey] = useState<string>(
    () => import.meta.env.VITE_ANTHROPIC_API_KEY as string
      || sessionStorage.getItem('anthropic_api_key')
      || ''
  );
  const [status, setStatus] = useState<ApiStatus>('idle');
  const [moodboardData, setMoodboardData] = useState<MoodboardData | null>(null);
  const [currentKeywords, setCurrentKeywords] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleApiKeySave = useCallback((key: string) => {
    sessionStorage.setItem('anthropic_api_key', key);
    setApiKey(key);
  }, []);

  const handleGenerate = useCallback(async (keywords: string) => {
    setStatus('loading');
    setErrorMessage('');
    setCurrentKeywords(keywords);
    try {
      const data = await generateMoodboard(keywords, apiKey);
      setMoodboardData(data);
      setStatus('success');
    } catch (error) {
      setStatus('error');
      if (error instanceof Error) {
        if (error.message.includes('authentication') || error.message.includes('401')) {
          setErrorMessage('API 키가 올바르지 않습니다. 키를 다시 확인해주세요.');
        } else if (error.message.includes('rate_limit') || error.message.includes('429')) {
          setErrorMessage('요청이 너무 많습니다. 잠시 후 다시 시도해주세요.');
        } else {
          setErrorMessage(error.message || '알 수 없는 오류가 발생했습니다.');
        }
      } else {
        setErrorMessage('알 수 없는 오류가 발생했습니다.');
      }
    }
  }, [apiKey]);

  if (!apiKey) {
    return <ApiKeySetup onSave={handleApiKeySave} />;
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
      <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo />
            <div>
              <h1 className="font-bold text-zinc-900 text-lg leading-tight">AI 무드보드 생성기</h1>
            </div>
          </div>
          {apiKey === 'demo' ? (
            <span className="text-xs bg-stone-100 text-zinc-500 px-3 py-1 rounded-full border border-stone-200">
              데모 모드
            </span>
          ) : (
            <button
              onClick={() => { sessionStorage.removeItem('anthropic_api_key'); setApiKey(''); }}
              className="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-[#2C4A2E] transition-colors"
            >
              <IconKey size={14} strokeWidth={1.5} />
              키 변경
            </button>
          )}
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-zinc-900 mb-3 tracking-tight">
            키워드로 만드는{' '}
            <span className="italic font-normal text-zinc-400">나만의 무드보드</span>
          </h2>
          <p className="text-zinc-500 text-base max-w-lg mx-auto leading-relaxed">
            원하는 분위기, 스타일, 테마를 입력하면
            AI가 색상 팔레트, 폰트, 키워드를 자동으로 추천해드립니다.
          </p>
        </div>

        <div className="mb-12">
          <KeywordInput onGenerate={handleGenerate} isLoading={status === 'loading'} />
        </div>

        {status === 'loading' && <LoadingSpinner />}

        {status === 'error' && (
          <div className="bg-white border border-stone-200 rounded-2xl p-5 flex items-start gap-3">
            <IconWarning size={20} className="text-zinc-400 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div>
              <p className="font-semibold text-zinc-800 mb-1">생성에 실패했습니다</p>
              <p className="text-zinc-500 text-sm">{errorMessage}</p>
              <button
                onClick={() => { if (currentKeywords) handleGenerate(currentKeywords); }}
                className="mt-3 text-sm text-zinc-500 hover:text-zinc-800 underline transition-colors"
              >
                다시 시도하기
              </button>
            </div>
          </div>
        )}

        {status === 'success' && moodboardData && (
          <MoodboardResult data={moodboardData} keywords={currentKeywords} />
        )}

        {status === 'idle' && (
          <div className="text-center py-20">
            <div className="flex justify-center mb-4 opacity-10">
              <IconCanvas size={64} strokeWidth={0.8} className="text-zinc-500" />
            </div>
            <p className="text-zinc-300 text-base">키워드를 입력하고 무드보드를 생성해보세요</p>
          </div>
        )}
      </main>

      <footer className="text-center py-8 text-zinc-300 text-xs border-t border-stone-200 mt-10">
        <p>AI 무드보드 생성기 · Claude Opus 4.7</p>
      </footer>
    </div>
  );
}

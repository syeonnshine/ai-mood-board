import Anthropic from '@anthropic-ai/sdk';
import type { MoodboardData } from '../types/moodboard';

/**
 * 무드보드 생성을 위한 시스템 프롬프트
 * 프롬프트 캐싱으로 반복 요청 시 비용 절감
 */
const SYSTEM_PROMPT = `You are a creative color expert and visual designer. Generate a UNIQUE and DIVERSE moodboard for each keyword.

## Color Palette Rules (most important)
- First, analyze the keyword's emotional temperature: is it warm, cool, or neutral?
- NEVER default to beige/brown/green combinations unless the keyword explicitly demands earth tones
- Each palette must have clear contrast — always mix at least one light and one dark tone
- Include at least one unexpected accent color that surprises but still fits the mood
- Vary the palette structure every time: muted vs vibrant, pastel vs deep, monochrome vs complementary
- If the keyword feels energetic or bold → use saturated, high-contrast colors
- If the keyword feels calm or minimal → use desaturated, low-contrast tones
- If the keyword feels dark, edgy, or dramatic → use deep moody colors with one bright accent
- If the keyword feels playful or fun → use unexpected color combinations, avoid safe neutrals
- Think beyond safe palettes — consider neon, dusty pastels, jewel tones, high-contrast black+color combos

## Output Rules
Generate exactly 5 colors. Each color must have:
- HEX code
- Korean name (한국어 색상 이름)
- One-line emotional description in Korean

## Font Combinations
- 2–3 combinations
- Use only real Google Fonts (e.g. "Playfair Display", "Lato")
- Separate heading and body fonts

## Mood Keywords
- 10–15 keywords in Korean that capture the mood

## Overall Mood
- 2–3 sentence summary in Korean

응답은 반드시 순수 JSON 형식으로만 작성하세요. 마크다운 코드 블록이나 다른 텍스트 없이 JSON만 반환하세요.

응답 형식:
{
  "colorPalette": [
    { "hex": "#16213E", "name": "딥 네이비", "description": "깊이 있는 신뢰감" },
    ...
  ],
  "fontCombinations": [
    { "heading": "Playfair Display", "body": "Source Sans 3", "description": "고급스러움과 가독성의 균형" },
    ...
  ],
  "moodKeywords": ["우아한", "현대적인", ...],
  "overallMood": "전체 무드 설명..."
}`;

/**
 * 데모 모드용 샘플 무드보드 데이터
 * API 키 없이 UI를 체험할 때 사용합니다.
 */
const DEMO_MOODBOARDS: MoodboardData[] = [
  {
    colorPalette: [
      { hex: '#2D1B69', name: '딥 바이올렛', description: '신비롭고 깊이 있는 보라' },
      { hex: '#8B5CF6', name: '미드 퍼플', description: '창의성과 상상력의 에너지' },
      { hex: '#EC4899', name: '핫 핑크', description: '생동감 넘치는 열정과 설렘' },
      { hex: '#F59E0B', name: '앰버 골드', description: '따뜻하고 활기찬 햇살 같은 온기' },
      { hex: '#F8F7FF', name: '라벤더 화이트', description: '순수하고 여백 있는 고요함' },
    ],
    fontCombinations: [
      { heading: 'Playfair Display', body: 'Lato', description: '고전적 우아함과 현대적 가독성의 만남' },
      { heading: 'Montserrat', body: 'Open Sans', description: '세련되고 깔끔한 모던 크리에이티브' },
    ],
    moodKeywords: ['창의적인', '감각적인', '모던한', '생동감 있는', '세련된', '신비로운', '역동적인', '감성적인', '독창적인', '트렌디한', '대담한', '예술적인'],
    overallMood: '이 무드보드는 창의성과 열정이 넘치는 분위기를 담고 있습니다. 깊은 보라와 핫 핑크의 대비가 강렬한 인상을 주며, 앰버 골드 포인트가 따뜻한 활기를 더합니다. 세련되고 현대적이면서도 감성적인 디자인 방향을 제시합니다.',
  },
  {
    colorPalette: [
      { hex: '#0F2027', name: '딥 오션', description: '심해처럼 고요하고 광활한' },
      { hex: '#203A43', name: '슬레이트 블루', description: '안정감과 깊이가 공존하는' },
      { hex: '#2C5364', name: '스틸 블루', description: '차분하면서도 강인한 인상' },
      { hex: '#4ECDC4', name: '터콰이즈', description: '청량하고 생동감 있는 포인트' },
      { hex: '#F7F9FC', name: '미스트 화이트', description: '새벽 안개처럼 부드러운 여백' },
    ],
    fontCombinations: [
      { heading: 'Cormorant Garamond', body: 'Nunito Sans', description: '클래식 세리프와 현대적 산세리프의 조화' },
      { heading: 'Space Grotesk', body: 'Inter', description: '테크놀로지 감성의 미니멀 조합' },
    ],
    moodKeywords: ['미니멀한', '차분한', '세련된', '지적인', '현대적인', '고요한', '깊이 있는', '신뢰감 있는', '클린한', '전문적인', '절제된', '우아한'],
    overallMood: '깊고 차분한 오션 블루 계열이 안정감과 신뢰를 전달합니다. 터콰이즈 포인트가 단조로움을 깨고 생동감을 더하며, 전체적으로 지적이고 절제된 아름다움이 돋보입니다. 미니멀하지만 깊이 있는 브랜드 아이덴티티에 이상적입니다.',
  },
  {
    colorPalette: [
      { hex: '#F4E4C1', name: '웜 크림', description: '자연스럽고 포근한 온기' },
      { hex: '#D4A97A', name: '카라멜 베이지', description: '흙냄새 나는 따뜻한 대지' },
      { hex: '#8B6045', name: '모카 브라운', description: '진하고 풍요로운 커피 빛' },
      { hex: '#4A7C59', name: '포레스트 그린', description: '자연의 생명력과 신선함' },
      { hex: '#2C4A2E', name: '딥 포레스트', description: '숲 깊은 곳의 고요하고 안정적인' },
    ],
    fontCombinations: [
      { heading: 'Libre Baskerville', body: 'Source Serif 4', description: '따뜻하고 전통적인 세리프 조합' },
      { heading: 'Josefin Sans', body: 'Merriweather', description: '자연스러운 기하 산세리프와 세리프의 대비' },
    ],
    moodKeywords: ['자연스러운', '따뜻한', '유기적인', '편안한', '지속가능한', '진정성 있는', '풍요로운', '소박한', '내추럴한', '에코', '힐링', '포근한'],
    overallMood: '대지와 자연에서 영감 받은 따뜻한 어스 톤이 편안함과 진정성을 전달합니다. 카라멜과 모카의 풍요로운 갈색 계열이 포레스트 그린과 만나 균형 잡힌 자연의 아름다움을 표현합니다. 친환경적이고 진실된 브랜드에 최적화된 무드입니다.',
  },
];

/** 데모 키워드별 무드보드 인덱스 선택 */
function getDemoIndex(keywords: string): number {
  const sum = keywords.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return sum % DEMO_MOODBOARDS.length;
}

/**
 * Claude API를 호출하여 무드보드 데이터를 생성합니다.
 * apiKey가 'demo'이면 샘플 데이터를 반환합니다.
 * 시스템 프롬프트에 캐싱을 적용하여 비용을 절감합니다.
 */
export async function generateMoodboard(
  keywords: string,
  apiKey: string
): Promise<MoodboardData> {
  // 데모 모드: API 키 없이 샘플 데이터 반환
  if (apiKey === 'demo') {
    await new Promise((r) => setTimeout(r, 1200)); // 로딩 체험용 딜레이
    return DEMO_MOODBOARDS[getDemoIndex(keywords)];
  }

  const client = new Anthropic({
    apiKey,
    // 브라우저 환경에서 사용 (개발/데모용)
    dangerouslyAllowBrowser: true,
  });

  const response = await client.messages.create({
    model: 'claude-opus-4-7',
    max_tokens: 2048,
    // 시스템 프롬프트 캐싱 적용 — 동일한 시스템 프롬프트가 반복될 때 비용 절감
    system: [
      {
        type: 'text' as const,
        text: SYSTEM_PROMPT,
        cache_control: { type: 'ephemeral' as const },
      },
    ],
    messages: [
      {
        role: 'user' as const,
        content: `키워드: "${keywords}"\n\n이 키워드의 고유한 감성과 분위기를 깊이 분석하여 무드보드를 생성해주세요. 다른 키워드와 절대 겹치지 않는 독창적인 색상 팔레트를 선택하세요.`,
      },
    ],
  });

  // 텍스트 블록에서 JSON 추출
  const textBlock = response.content.find((block) => block.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Claude로부터 텍스트 응답을 받지 못했습니다.');
  }

  // JSON 파싱
  let rawText = textBlock.text.trim();
  // 혹시 마크다운 코드 블록으로 감싸진 경우 제거
  const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    rawText = jsonMatch[1].trim();
  }

  const data = JSON.parse(rawText) as MoodboardData;

  // 기본 유효성 검사
  if (!data.colorPalette || !data.fontCombinations || !data.moodKeywords || !data.overallMood) {
    throw new Error('생성된 데이터 형식이 올바르지 않습니다.');
  }

  return data;
}

/** 색상 팔레트의 개별 색상 */
export interface Color {
  hex: string;        // HEX 색상 코드 (예: #FF6B6B)
  name: string;       // 색상 이름 (한국어)
  description: string; // 감성적 설명
}

/** 폰트 조합 */
export interface FontCombination {
  heading: string;    // 제목용 Google 폰트 이름
  body: string;       // 본문용 Google 폰트 이름
  description: string; // 조합 설명
}

/** 무드보드 전체 데이터 */
export interface MoodboardData {
  colorPalette: Color[];
  fontCombinations: FontCombination[];
  moodKeywords: string[];
  overallMood: string;
}

/** API 호출 상태 */
export type ApiStatus = 'idle' | 'loading' | 'success' | 'error';

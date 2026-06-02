/** 커스텀 SVG 아이콘 모음 — stroke 기반, 16-20px 기준 */

interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const defaults = { size: 18, strokeWidth: 1.6 };

/** 경고 / 오류 상태 */
export function IconWarning({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 3L18 17H2L10 3Z" stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <line x1="10" y1="9" x2="10" y2="12.5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="10" cy="14.5" r="0.6" fill="currentColor"/>
    </svg>
  );
}

/** 캔버스 / 무드보드 빈 상태 */
export function IconCanvas({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="2" y="2" width="16" height="16" rx="2" stroke="currentColor" strokeWidth={strokeWidth}/>
      <rect x="5" y="5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth={strokeWidth}/>
      <rect x="11" y="5" width="4" height="4" rx="1" stroke="currentColor" strokeWidth={strokeWidth}/>
      <rect x="5" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth={strokeWidth}/>
      <rect x="11" y="11" width="4" height="4" rx="1" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  );
}

/** 키 / API 키 */
export function IconKey({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="7.5" cy="8" r="3.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <path d="M10 10.5L17 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M14.5 14.5L14.5 17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M16.5 15.5H17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

/** 정보 / 팁 힌트 */
export function IconInfo({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <line x1="10" y1="9" x2="10" y2="14" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="10" cy="6.5" r="0.7" fill="currentColor"/>
    </svg>
  );
}

/** 타이포그래피 / 폰트 */
export function IconType({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 5H17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M10 5V16" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M8 16H12" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

/** 스파크 / 생성하기 */
export function IconSparkle({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 2L11.5 8.5L18 10L11.5 11.5L10 18L8.5 11.5L2 10L8.5 8.5L10 2Z"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round"/>
    </svg>
  );
}

/** 팔레트 / 무드보드 생성 완료 헤더 */
export function IconPalette({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M10 2.5C6 2.5 2.5 6 2.5 10C2.5 14 6 17.5 10 17.5C11.5 17.5 12.5 16.5 12.5 15C12.5 14.5 12.3 14 12 13.7C11.7 13.4 11.5 13 11.5 12.5C11.5 11.7 12.2 11 13 11H14.5C16.2 11 17.5 9.7 17.5 8C17.5 4.9 14.1 2.5 10 2.5Z"
        stroke="currentColor" strokeWidth={strokeWidth}/>
      <circle cx="6.5" cy="10" r="1" fill="currentColor"/>
      <circle cx="8" cy="7" r="1" fill="currentColor"/>
      <circle cx="11" cy="6.5" r="1" fill="currentColor"/>
      <circle cx="13.5" cy="8.5" r="1" fill="currentColor"/>
    </svg>
  );
}

/** 태그 / 키워드 */
export function IconTag({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M2.5 2.5H9.5L17.5 10.5L10.5 17.5L2.5 9.5V2.5Z"
        stroke="currentColor" strokeWidth={strokeWidth} strokeLinejoin="round"/>
      <circle cx="6.5" cy="6.5" r="1.2" fill="currentColor"/>
    </svg>
  );
}

/** 메모 / 전체 무드 설명 */
export function IconNote({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <rect x="3" y="2.5" width="14" height="15" rx="1.5" stroke="currentColor" strokeWidth={strokeWidth}/>
      <line x1="6.5" y1="7" x2="13.5" y2="7" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="6.5" y1="10" x2="13.5" y2="10" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <line x1="6.5" y1="13" x2="10.5" y2="13" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
    </svg>
  );
}

/** 로딩 / 이미지 생성 중 */
export function IconWand({ size = defaults.size, className, strokeWidth = defaults.strokeWidth }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M3 17L11 9" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M11 3L11 5" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M14.2 4.8L12.8 6.2" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M15 8H17" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <path d="M14.2 11.2L12.8 9.8" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round"/>
      <circle cx="11" cy="8" r="2" stroke="currentColor" strokeWidth={strokeWidth}/>
    </svg>
  );
}

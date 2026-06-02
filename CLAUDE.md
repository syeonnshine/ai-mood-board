# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 지침

모든 응답, 설명, 주석은 **한국어**로 작성한다.

## 프로젝트 규칙

- 컴포넌트는 `src/components/`에 분리하여 작성한다.
- API 키 등 민감한 값은 `.env` 파일에서 불러온다. `.env`는 절대 커밋하지 않는다.

## Tech Stack

- **AI:** `@anthropic-ai/sdk` — Claude API 연동
- **Build:** Vite + React + TypeScript
- **Styling:** Tailwind CSS v4

## Commands

- `npm run dev` — Vite 개발 서버 시작
- `npm run build` — 프로덕션 빌드
- `npm test` — 테스트 실행

## Architecture Intent

The application should use the Anthropic SDK to send code to Claude for review and return structured feedback. The frontend is a Vite + React + TypeScript app styled with Tailwind CSS.

When implementing the Claude API integration, use prompt caching for repeated system prompts to reduce cost and latency. Default to the latest capable model (`claude-sonnet-4-6` or newer).

 
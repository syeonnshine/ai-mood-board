import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

/**
 * node:* 내장 모듈을 브라우저 shim으로 교체하는 Vite 플러그인
 *
 * @anthropic-ai/sdk v0.98은 agent-toolset 등에서 Node.js 내장 모듈을 사용합니다.
 * enforce: 'pre'로 vite:resolve보다 먼저 실행되어 shim 파일을 반환합니다.
 */
function nodeBuiltinShimPlugin(): Plugin {
  const shimDir = resolve(__dirname, 'src', 'shims')

  // 기존 shim 파일이 있는 모듈
  const fileShims: Record<string, string> = {
    'node:crypto': resolve(shimDir, 'crypto.ts'),
    'node:fs/promises': resolve(shimDir, 'fs.ts'),
    'node:fs': resolve(shimDir, 'fs.ts'),
    'node:path': resolve(shimDir, 'path.ts'),
  }

  // 가상(virtual) shim — 별도 파일 없이 인라인 순수 JS 코드 제공 (TypeScript 타입 없음)
  const virtualShims: Record<string, string> = {
    '\0shim:child_process': `
export const exec = (cmd, opts, cb) => { if (typeof opts === 'function') opts(null, '', ''); else if (typeof cb === 'function') cb(null, '', ''); };
export const execSync = () => '';
export const execFile = (file, args, opts, cb) => { const done = typeof opts === 'function' ? opts : cb; if (typeof done === 'function') done(null, '', ''); };
export const spawn = () => ({ stdout: { on: () => {}, pipe: () => {} }, stderr: { on: () => {} }, on: (e, cb) => { if (e === 'close') cb(0); }, kill: () => {} });
export const spawnSync = () => ({ stdout: '', stderr: '', status: 0 });
export default { exec, execSync, execFile, spawn, spawnSync };
`,
    '\0shim:readline': `
export const createInterface = () => ({ question: (q, cb) => cb(''), close: () => {} });
export default { createInterface };
`,
    '\0shim:util': `
export const promisify = (fn) => (...args) => new Promise((res, rej) => fn(...args, (e, v) => e ? rej(e) : res(v)));
export const inspect = (v) => String(v);
export const deprecate = (fn) => fn;
export default { promisify, inspect, deprecate };
`,
    '\0shim:stream': `
export class Readable { pipe() { return this; } on() { return this; } read() { return null; } }
export class Writable { write() {} end() {} on() { return this; } }
export class Transform extends Readable {}
export class PassThrough extends Transform {}
export const pipeline = (...args) => { const cb = args[args.length - 1]; if (typeof cb === 'function') cb(null); };
export default { Readable, Writable, Transform, PassThrough, pipeline };
`,
  }

  // node: 이름 → 가상 shim ID 매핑
  const nodeToVirtual: Record<string, string> = {
    'node:child_process': '\0shim:child_process',
    'node:readline': '\0shim:readline',
    'node:util': '\0shim:util',
    'node:stream': '\0shim:stream',
    'node:stream/promises': '\0shim:stream',
  }

  return {
    name: 'vite-plugin-node-builtin-shim',
    enforce: 'pre',
    resolveId(id) {
      // 파일 shim (기존 .ts 파일)
      if (id in fileShims) return fileShims[id]
      // 가상 shim
      if (id in nodeToVirtual) return nodeToVirtual[id]
      // 이미 가상 shim ID면 그대로 통과
      if (id.startsWith('\0shim:')) return id
      return null
    },
    load(id) {
      if (id in virtualShims) return virtualShims[id]
      return null
    },
  }
}

export default defineConfig({
  plugins: [
    nodeBuiltinShimPlugin(), // 반드시 react() 전에 위치
    react(),
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      onwarn(warning, warn) {
        if (warning.code === 'MODULE_LEVEL_DIRECTIVE') return
        warn(warning)
      },
    },
  },
})

/** node:path 브라우저 shim */
export const sep = '/';
export const delimiter = ':';
export const join = (...parts: string[]) => parts.join('/').replace(/\/+/g, '/');
export const dirname = (p: string) => p.split('/').slice(0, -1).join('/') || '.';
export const basename = (p: string, ext?: string) => {
  const base = p.split('/').pop() || '';
  return ext ? base.replace(new RegExp(ext.replace('.', '\\.') + '$'), '') : base;
};
export const resolve = (...parts: string[]) => '/' + parts.join('/').replace(/\/+/g, '/').replace(/^\/+/, '');
export const isAbsolute = (p: string) => p.startsWith('/');
export const readlink = () => Promise.resolve('');
export const extname = (p: string) => { const m = p.match(/\.[^.]+$/); return m ? m[0] : ''; };
export const relative = (from: string, to: string) => to;
export const normalize = (p: string) => p.replace(/\/+/g, '/');
export const parse = (p: string) => {
  const dir = dirname(p);
  const base = basename(p);
  const ext = extname(p);
  const name = base.slice(0, base.length - ext.length);
  return { root: '', dir, base, ext, name };
};
export const format = (obj: { dir?: string; root?: string; base?: string; name?: string; ext?: string }) => {
  const dir = obj.dir || obj.root || '';
  const base = obj.base || ((obj.name || '') + (obj.ext || ''));
  return dir ? dir + '/' + base : base;
};
export default { sep, delimiter, join, dirname, basename, resolve, isAbsolute, readlink, extname, relative, normalize, parse, format };

/** node:crypto 브라우저 shim */
export const randomUUID = (): string => globalThis.crypto.randomUUID();
export const createHash = () => ({
  update: () => ({ digest: () => '' }),
});
export const webcrypto = globalThis.crypto;
export default { randomUUID, createHash, webcrypto };

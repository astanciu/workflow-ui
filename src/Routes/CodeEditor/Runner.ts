import * as Velcro from '@velcro/runtime';

const idbCache = Velcro.createCache('@velcro/runtime:cache', (_segment, key) => !key.startsWith('file:///'));

const cacheStats = {
  hits: 0,
  misses: 0,
};

const cache = {
  ...idbCache,
  async get(segment, id) {
    const result = await idbCache.get(segment, id);

    if (result) {
      cacheStats.hits++;
      return result;
    }
    cacheStats.misses++;
  },
};

export const Run = async (files) => {
  const resolverHost = new Velcro.ResolverHostCompound({
    'https://unpkg.com/': new Velcro.ResolverHostUnpkg(),
    'file:///': new Velcro.ResolverHostMemory(files),
  });
  const runtime = Velcro.createRuntime({
    cache,
    injectGlobal: Velcro.injectGlobalFromUnpkg,
    resolveBareModule: Velcro.resolveBareModuleToUnpkg,
    resolverHost,
  });

  // const importStart = Date.now();
  const render = await runtime.import('file:///index.js');
  // const importEnd = Date.now();
  // const time = importEnd - importStart;

  return render;
};

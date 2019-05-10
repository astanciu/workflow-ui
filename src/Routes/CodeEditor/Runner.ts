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
  const memoryHost = new Velcro.ResolverHostMemory(files);
  const resolverHost = new Velcro.ResolverHostCompound({
    'https://unpkg.com/': new Velcro.ResolverHostUnpkg(),
    [memoryHost.urlFromPath('/').href]: memoryHost,
  });

  const runtime = Velcro.createRuntime({
    cache,
    injectGlobal: Velcro.injectGlobalFromUnpkg,
    resolveBareModule: Velcro.resolveBareModuleToUnpkg,
    resolverHost,
  });

  const index = memoryHost.urlFromPath('/index.js');
  const mod = await runtime.import(index);

  return mod;
};

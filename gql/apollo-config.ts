import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage, PersistedData } from 'apollo-cache-persist/types'

export default function () {
  const cache = new InMemoryCache()
  if (process.client) {
    try {
      // CONFIGURE PERSISTANT CACHE
      persistCache({
        cache,
        storage: window.localStorage as PersistentStorage<
          PersistedData<NormalizedCacheObject> // fix see: https://github.com/apollographql/apollo-cache-persist/issues/17
        >,
      })
    } catch (error) {
      // console.error('Error restoring Apollo cache', error)
    }
  }
  return {
    httpEndpoint: process.env.STRAPI_ENDPOINT,
    cache,
  }
}

import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist'

export default function () {
  const cache = new InMemoryCache()
  if (process.client) {
    try {
      // CONFIGURE PERSISTANT CACHE
      persistCache({
        cache,
        storage: window.localStorage,
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

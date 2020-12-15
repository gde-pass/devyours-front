import { CookieSetOptions } from 'universal-cookie'
import ApolloClient from 'apollo-client'

interface CookieAttributes extends Omit<CookieSetOptions, 'expires'> {
  expires?: number | Date
}

export interface ApolloHelpers {
  onLogin(
    token: string,
    apolloClient?: ApolloClient<any>,
    cookieAttributes?: number | CookieAttributes,
    skipResetStore?: boolean
  ): Promise<void>
  onLogout(apolloClient?: ApolloClient<any>): Promise<void>
  getToken(tokenName?: string): string
}

declare module 'vue/types/vue' {
  interface Vue {
    $apolloHelpers: ApolloHelpers
  }
}

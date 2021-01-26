import { Context, Middleware } from '@nuxt/types'
import { MeQuery } from '~/types/generated/schema.ts'
import meQuery from '~/gql/queries/me.gql'
const authenticated: Middleware = async function ({
  app,
  redirect,
}: Context): Promise<void> {
  const hasToken = !!app.$apolloHelpers.getToken()
  const path = app.localePath('/sign-in')

  if (!hasToken) {
    return redirect(path)
  }
  // make sure the token is still valid
  try {
    const {
      data: { me },
    }: {
      data: { me: MeQuery }
    } = await app.apolloProvider!.defaultClient.query({
      query: meQuery,
    })
    if (!Object.keys(me).length) {
      return redirect(path)
    }
    // we are good to go and validated
  } catch (e) {
    // token is not valid
    // logout user to clear storage
    try {
      await app.$apolloHelpers.onLogout()
      // redirect them to login page
      return redirect(path)
    } catch (e) {
      //   console.error(e)
    }
  }
}

export default authenticated

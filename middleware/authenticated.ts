import { Context, Middleware } from '@nuxt/types'
import { MeQuery } from '~/types/types.ts'
import meQuery from '~/gql/queries/me.gql'

const authenticated: Middleware = async function ({
  app,
  redirect,
}: Context): Promise<void> {
  const hasToken = !!app.$apolloHelpers.getToken()

  if (!hasToken) {
    return redirect('/sign-in')
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
      return redirect('/sign-in')
    }
    // we are good to go and validated
  } catch (e) {
    // token is not valid
    // logout user to clear storage
    try {
      await app.$apolloHelpers.onLogout()
      // redirect them to login page
      return redirect('/sign-in')
    } catch (e) {
      //   console.error(e)
    }
  }
}

export default authenticated

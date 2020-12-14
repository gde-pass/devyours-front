import meQuery from '~/gql/queries/me.gql'

export default async function ({ store, app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  const hasStorage = store.getters['user/getStatus']

  if (!hasToken || !hasStorage) {
    return redirect('/sign-in')
  }
  // make sure the token is still valid
  try {
    const {
      data: { me },
    } = await app.apolloProvider.defaultClient.query({
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

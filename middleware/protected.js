import meQuery from '~/queries/me.gql'

export default async function ({ app, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    return redirect('/login')
  }
  // make sure the token is still valid
  try {
    const {
      data: { me },
    } = await app.apolloProvider.defaultClient.query({
      query: meQuery,
    })
    if (!Object.keys(me).length) {
      return redirect('/login')
    }
    // we are good to go and validated
  } catch (e) {
    // token is not valid
    // logout user to clear storage
    try {
      await app.$apolloHelpers.onLogout()
      // redirect them to login page
      return redirect('/login')
    } catch (e) {
      //   console.error(e)
    }
  }
}

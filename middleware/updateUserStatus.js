export default function ({ app, store }) {
  const hasToken = !!app.$apolloHelpers.getToken()

  if (hasToken) {
    store.commit('switchOnUserConnexionStatus')
  } else {
    store.commit('switchOffUserConnexionStatus')
  }
}
